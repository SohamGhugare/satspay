;; Collateral Management contract for SatsPay
;; Handles locking and unlocking sBTC collateral for loans

(define-constant CONTRACT_OWNER 'ST000000000000000000002AMW42H)
(define-constant SBTC_CONTRACT 'ST000000000000000000002AMW42H.sbtc-token)

;; Error codes
(define-constant ERR_INSUFFICIENT_COLLATERAL u1)
(define-constant ERR_NOT_AUTHORIZED u2)
(define-constant ERR_LOAN_NOT_FOUND u3)
(define-constant ERR_LOAN_NOT_OVERDUE u4)
(define-constant ERR_LOAN_ALREADY_LIQUIDATED u5)

;; Maps to track collateral
(define-map loan-collateral uint uint) ;; loan-id -> collateral amount
(define-map user-collateral principal uint) ;; user -> total collateral
(define-map loan-status uint bool) ;; loan-id -> is-liquidated

;; Lock collateral for a loan
(define-public (lock-collateral (loan-id uint) (amount uint) (borrower principal))
    (begin
        (asserts! (is-eq tx-sender borrower) (err ERR_NOT_AUTHORIZED))
        (asserts! (> amount u0) (err ERR_INSUFFICIENT_COLLATERAL))
        
        ;; Transfer sBTC from borrower to contract
        (try! (contract-call? SBTC_CONTRACT transfer-from amount borrower tx-sender))
        
        ;; Update collateral tracking
        (map-set loan-collateral loan-id amount)
        (let ((current-collateral (default-to u0 (map-get? user-collateral borrower))))
            (map-set user-collateral borrower (+ current-collateral amount))
        )
        (ok amount)
    )
)

;; Unlock collateral after loan repayment
(define-public (unlock-collateral (loan-id uint) (borrower principal))
    (begin
        (asserts! (is-eq tx-sender CONTRACT_OWNER) (err ERR_NOT_AUTHORIZED))
        
        (let ((collateral-amount (default-to u0 (map-get? loan-collateral loan-id))))
            (asserts! (> collateral-amount u0) (err ERR_LOAN_NOT_FOUND))
            
            ;; Transfer sBTC back to borrower
            (try! (contract-call? SBTC_CONTRACT transfer collateral-amount tx-sender borrower))
            
            ;; Update collateral tracking
            (map-delete loan-collateral loan-id)
            (let ((current-collateral (default-to u0 (map-get? user-collateral borrower))))
                (map-set user-collateral borrower (- current-collateral collateral-amount))
            )
            (ok collateral-amount)
        )
    )
)

;; Liquidate collateral for overdue loan
(define-public (liquidate-collateral (loan-id uint) (borrower principal))
    (begin
        (asserts! (is-eq tx-sender CONTRACT_OWNER) (err ERR_NOT_AUTHORIZED))
        
        (let ((collateral-amount (default-to u0 (map-get? loan-collateral loan-id))))
            (asserts! (> collateral-amount u0) (err ERR_LOAN_NOT_FOUND))
            (asserts! (not (default-to false (map-get? loan-status loan-id))) (err ERR_LOAN_ALREADY_LIQUIDATED))
            
            ;; Mark loan as liquidated
            (map-set loan-status loan-id true)
            
            ;; Update collateral tracking
            (map-delete loan-collateral loan-id)
            (let ((current-collateral (default-to u0 (map-get? user-collateral borrower))))
                (map-set user-collateral borrower (- current-collateral collateral-amount))
            )
            (ok collateral-amount)
        )
    )
)

;; Get collateral amount for a loan
(define-read-only (get-loan-collateral (loan-id uint))
    (default-to u0 (map-get? loan-collateral loan-id))
)

;; Get total collateral for a user
(define-read-only (get-user-collateral (user principal))
    (default-to u0 (map-get? user-collateral user))
)

;; Check if loan is liquidated
(define-read-only (is-loan-liquidated (loan-id uint))
    (default-to false (map-get? loan-status loan-id))
) 