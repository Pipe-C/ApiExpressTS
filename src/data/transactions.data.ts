import {
  Transaction,
  TransactionStatus,
  TypePayment,
} from "./models/transactions.model";

// Mock de transacciones
export const INITIAL_TRANSACTION_DATA: Transaction[] = [
  {
    id: 1,
    amount: 2000,
    accumulate: 2,
    typePayment: TypePayment.CREDIT_CARD,
    status: TransactionStatus.COMPLETED,
    createdAt: new Date("2026-03-25T10:30:00Z"),
  },
  {
    id: 2,
    amount: 500,
    accumulate: 0,
    typePayment: TypePayment.DEBIT_CARD,
    status: TransactionStatus.COMPLETED,
    createdAt: new Date("2026-03-26T14:15:00Z"),
  },
  {
    id: 3,
    amount: 1000,
    accumulate: 1,
    typePayment: TypePayment.TRANSFER,
    status: TransactionStatus.PENDING,
    createdAt: new Date("2026-03-28T09:00:00Z"),
  },
  {
    id: 4,
    amount: 3500,
    accumulate: 0,
    typePayment: TypePayment.CASH,
    status: TransactionStatus.FAILED,
    createdAt: new Date("2026-03-29T18:45:00Z"),
  },
];

// Simular la persistencia
export const transactionData: Transaction[] = [...INITIAL_TRANSACTION_DATA];