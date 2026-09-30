export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum TypePayment {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  TRANSFER = "TRANSFER",
  CASH = "CASH",
}

// Interfaz en singular con fechas de auditoría
export interface Transaction {
  id: number;
  amount: number;
  accumulate: number;
  typePayment: TypePayment;
  status: TransactionStatus;
  createdAt?: Date; // 
}