import { Transaction, TransactionStatus, TypePayment } from "../../data/models/transactions.model";

// Filtros de persistencia para no depender del Servicio
export interface TransactionQueryFilters {
  status?: TransactionStatus;
  typePayment?: TypePayment;
  sort?: "accumulate";
  page?: number;
  limit?: number;
}

// Contrato completo del Repositorio
export interface ITransactionsRepository {
  getTransactions(filters?: TransactionQueryFilters): Promise<Transaction[]>;
  getTransactionById(id: number): Promise<Transaction | null>;
  createTransaction(transactionData: Omit<Transaction, "id">): Promise<Transaction>;
}