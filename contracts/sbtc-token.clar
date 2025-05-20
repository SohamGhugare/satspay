;; sBTC Token contract for SatsPay
;; Handles sBTC token transfers and collateral management

(define-constant CONTRACT_OWNER 'ST000000000000000000002AMW42H)
(define-constant TOKEN_NAME "sBTC")
(define-constant TOKEN_SYMBOL "sBTC")
(define-constant DECIMALS u8)

(define-data-var total-supply uint u0)
(define-data-var name (string-ascii 32) TOKEN_NAME)
(define-data-var symbol (string-ascii 32) TOKEN_SYMBOL)
(define-data-var decimals uint DECIMALS)

(define-map balances principal uint)
(define-map allowances (tuple (owner principal) (spender principal)) uint)

;; Error codes
(define-constant ERR_INSUFFICIENT_BALANCE u1)
(define-constant ERR_INSUFFICIENT_ALLOWANCE u2)
(define-constant ERR_NOT_AUTHORIZED u3)
(define-constant ERR_NON_POSITIVE_AMOUNT u4)

;; Mint new sBTC tokens
(define-public (mint (amount uint) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender CONTRACT_OWNER) (err ERR_NOT_AUTHORIZED))
        (asserts! (> amount u0) (err ERR_NON_POSITIVE_AMOUNT))
        
        (let ((current-balance (default-to u0 (map-get? balances recipient))))
            (map-set balances recipient (+ current-balance amount))
            (var-set total-supply (+ (var-get total-supply) amount))
            (ok amount)
        )
    )
)

;; Burn sBTC tokens
(define-public (burn (amount uint))
    (begin
        (asserts! (> amount u0) (err ERR_NON_POSITIVE_AMOUNT))
        
        (let ((current-balance (default-to u0 (map-get? balances tx-sender))))
            (asserts! (>= current-balance amount) (err ERR_INSUFFICIENT_BALANCE))
            
            (map-set balances tx-sender (- current-balance amount))
            (var-set total-supply (- (var-get total-supply) amount))
            (ok amount)
        )
    )
)

;; Transfer sBTC tokens
(define-public (transfer (amount uint) (sender principal) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender sender) (err ERR_NOT_AUTHORIZED))
        (asserts! (> amount u0) (err ERR_NON_POSITIVE_AMOUNT))
        
        (let ((sender-balance (default-to u0 (map-get? balances sender))))
            (asserts! (>= sender-balance amount) (err ERR_INSUFFICIENT_BALANCE))
            
            (let ((recipient-balance (default-to u0 (map-get? balances recipient))))
                (map-set balances sender (- sender-balance amount))
                (map-set balances recipient (+ recipient-balance amount))
                (ok amount)
            )
        )
    )
)

;; Approve spender to transfer tokens
(define-public (approve (spender principal) (amount uint))
    (begin
        (asserts! (> amount u0) (err ERR_NON_POSITIVE_AMOUNT))
        
        (map-set allowances (tuple (owner tx-sender) (spender spender)) amount)
        (ok amount)
    )
)

;; Transfer tokens on behalf of owner
(define-public (transfer-from (amount uint) (sender principal) (recipient principal))
    (begin
        (asserts! (> amount u0) (err ERR_NON_POSITIVE_AMOUNT))
        
        (let ((allowance (default-to u0 (map-get? allowances (tuple (owner sender) (spender tx-sender))))))
            (asserts! (>= allowance amount) (err ERR_INSUFFICIENT_ALLOWANCE))
            
            (let ((sender-balance (default-to u0 (map-get? balances sender))))
                (asserts! (>= sender-balance amount) (err ERR_INSUFFICIENT_BALANCE))
                
                (let ((recipient-balance (default-to u0 (map-get? balances recipient))))
                    (map-set balances sender (- sender-balance amount))
                    (map-set balances recipient (+ recipient-balance amount))
                    (map-set allowances (tuple (owner sender) (spender tx-sender)) (- allowance amount))
                    (ok amount)
                )
            )
        )
    )
)

;; Get token metadata
(define-read-only (get-name)
    (var-get name)
)

(define-read-only (get-symbol)
    (var-get symbol)
)

(define-read-only (get-decimals)
    (var-get decimals)
)

(define-read-only (get-total-supply)
    (var-get total-supply)
)

;; Get balance of a principal
(define-read-only (get-balance (owner principal))
    (default-to u0 (map-get? balances owner))
)

;; Get allowance
(define-read-only (get-allowance (owner principal) (spender principal))
    (default-to u0 (map-get? allowances (tuple (owner owner) (spender spender))))
) 