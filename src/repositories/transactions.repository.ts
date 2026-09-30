import { Transaction } from "../data/models/transactions.model";
import { transactionData } from "../data/transactions.data"; // Typo de ruta corregido
import {
  ITransactionsRepository,
  TransactionQueryFilters,
} from "./interfaces/transactions.interface";

export class TransactionsRepository implements ITransactionsRepository {
  // Obtener transacciones con filtros y paginación
  public async getTransactions(
    filters?: TransactionQueryFilters
  ): Promise<Transaction[]> {
    let result = [...transactionData];

    if (filters?.status) {
      result = result.filter((t) => t.status === filters.status);
    }

    if (filters?.typePayment) {
      result = result.filter((t) => t.typePayment === filters.typePayment);
    }

    if (filters?.sort === "accumulate") {
      result.sort((a, b) => b.accumulate - a.accumulate);
    }

    // Paginación opcional en memoria
    if (filters?.page && filters?.limit) {
      const startIndex = (filters.page - 1) * filters.limit;
      result = result.slice(startIndex, startIndex + filters.limit);
    }

    return this.mapTransactions(result);
  }

  // Buscar por ID
  public async getTransactionById(id: number): Promise<Transaction | null> {
    const transaction = transactionData.find((t) => t.id === id);
    if (!transaction) return null;

    return this.mapTransaction(transaction);
  }

  // Crear nueva transacción
  public async createTransaction(
    data: Omit<Transaction, "id">
  ): Promise<Transaction> {
    const newId = transactionData.length > 0 
      ? Math.max(...transactionData.map((t) => t.id)) + 1 
      : 1;

    const newTransaction: Transaction = {
      id: newId,
      ...data,
      createdAt: new Date(),
    };

    transactionData.push(newTransaction);
    return this.mapTransaction(newTransaction);
  }

  // --- Mapeadores Auxiliares (Síncronos) ---
  private mapTransactions(transactions: Transaction[]): Transaction[] {
    return transactions.map((t) => this.mapTransaction(t));
  }

  private mapTransaction(t: Transaction): Transaction {
    return {
      id: t.id,
      amount: t.amount,
      accumulate: t.accumulate,
      typePayment: t.typePayment,
      status: t.status,
      createdAt: t.createdAt,
    };
  }
}