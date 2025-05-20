;; Main Loan contract for SatsPay
;; Handles loan creation, repayment, and liquidation

(define-constant CONTRACT_OWNER 'ST000000000000000000002AMW42H)
(define-constant COLLATERAL_CONTRACT 'ST000000000000000000002AMW42H.collateral)
(define-constant SBTC_CONTRACT 'ST000000000000000000002AMW42H.sbtc-token)

;; Constants
(define-constant COLLATERAL_RATIO u150) ;; 150% collateral required
(define-constant MIN_LOAN_AMOUNT u1000000) ;; 1 STX
(define-constant MAX_LOAN_AMOUNT u100000000) ;; 100 STX
(define-constant INTEREST_RATE u5) ;; 5% interest rate

;; Error codes
(define-constant ERR_INSUFFICIENT_COLLATERAL u1)
(define-constant ERR_INVALID_LOAN_AMOUNT u2)
(define-constant ERR_LOAN_NOT_FOUND u3)
(define-constant ERR_LOAN_ALREADY_REPAID u4)
(define-constant ERR_LOAN_NOT_OVERDUE u5)
(define-constant ERR_NOT_AUTHORIZED u6)

;; Loan structure
(define-data-var next-loan-id uint u1)

(define-map loans uint (tuple 
    (borrower principal)
    (amount uint)
    (collateral uint)
    (start-time uint)
    (end-time uint)
    (is-repaid bool)
))

(define-map user-loans principal (list uint))

;; Create a new loan
(define-public (create-loan (amount uint) (term uint) (borrower principal))
    (begin
        (asserts! (is-eq tx-sender borrower) (err ERR_NOT_AUTHORIZED))
        (asserts! (and (>= amount MIN_LOAN_AMOUNT) (<= amount MAX_LOAN_AMOUNT)) (err ERR_INVALID_LOAN_AMOUNT))
        
        (let ((loan-id (var-get next-loan-id))
              (required-collateral (/ (* amount COLLATERAL_RATIO) u100))
              (current-time (block-height)))
            
            ;; Lock collateral
            (try! (contract-call? COLLATERAL_CONTRACT lock-collateral loan-id required-collateral borrower))
            
            ;; Create loan record
            (map-set loans loan-id (tuple 
                (borrower borrower)
                (amount amount)
                (collateral required-collateral)
                (start-time current-time)
                (end-time (+ current-time term))
                (is-repaid false)
            ))
            
            ;; Update user's loans
            (let ((user-loan-list (default-to (list) (map-get? user-loans borrower))))
                (map-set user-loans borrower (append user-loan-list (list loan-id)))
            )
            
            ;; Increment loan ID
            (var-set next-loan-id (+ loan-id u1))
            
            (ok loan-id)
        )
    )
)

;; Repay a loan
(define-public (repay-loan (loan-id uint))
    (begin
        (let ((loan (unwrap! (map-get? loans loan-id) (err ERR_LOAN_NOT_FOUND))))
            (asserts! (is-eq tx-sender (get borrower loan)) (err ERR_NOT_AUTHORIZED))
            (asserts! (not (get is-repaid loan)) (err ERR_LOAN_ALREADY_REPAID))
            
            (let ((amount (get amount loan))
                  (interest (/ (* amount INTEREST_RATE) u100))
                  (total-repayment (+ amount interest)))
                
                ;; Update loan status
                (map-set loans loan-id (tuple 
                    (borrower (get borrower loan))
                    (amount amount)
                    (collateral (get collateral loan))
                    (start-time (get start-time loan))
                    (end-time (get end-time loan))
                    (is-repaid true)
                ))
                
                ;; Unlock collateral
                (try! (contract-call? COLLATERAL_CONTRACT unlock-collateral loan-id (get borrower loan)))
                
                (ok total-repayment)
            )
        )
    )
)

;; Liquidate an overdue loan
(define-public (liquidate-loan (loan-id uint))
    (begin
        (asserts! (is-eq tx-sender CONTRACT_OWNER) (err ERR_NOT_AUTHORIZED))
        
        (let ((loan (unwrap! (map-get? loans loan-id) (err ERR_LOAN_NOT_FOUND))))
            (asserts! (not (get is-repaid loan)) (err ERR_LOAN_ALREADY_REPAID))
            (asserts! (> (block-height) (get end-time loan)) (err ERR_LOAN_NOT_OVERDUE))
            
            ;; Liquidate collateral
            (try! (contract-call? COLLATERAL_CONTRACT liquidate-collateral loan-id (get borrower loan)))
            
            (ok (get collateral loan))
        )
    )
)

;; Get loan details
(define-read-only (get-loan (loan-id uint))
    (unwrap! (map-get? loans loan-id) (err ERR_LOAN_NOT_FOUND))
)

;; Get user's loans
(define-read-only (get-user-loans (user principal))
    (default-to (list) (map-get? user-loans user))
)

;; Get total loans and collateral
(define-read-only (get-total-loans)
    (- (var-get next-loan-id) u1)
)

(define-read-only (get-total-collateral)
    (contract-call? COLLATERAL_CONTRACT get-total-collateral)
) 