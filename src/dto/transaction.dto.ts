export enum TypePayment {
    CASH = "CASH",
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
}

export enum TransactionStatus {
    PENDING = "PENDING",    
    COMPLETED = "SUCESS",
    FAILED = "FAILED",
}

export interface TransactionRequestDTO {
    amount: number;
    typePayment: TypePayment;
}

export interface TransactionResponseDTO {
    id: string,
    amount: number,
    accumulate: number,
    TypePayment: TypePayment,
    status: TransactionStatus
}