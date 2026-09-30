import {
  TransactionsRequestDTO,
  TransactionsResponseDTO,
} from "../../dto/transactions.dto";
import {
  TransactionStatus,
  TypePayment,
} from "../../data/models/transactions.model"; 

// Filtros aplicables desde la capa de servicios
export interface TransactionsFilters {
  status?: TransactionStatus;
  typePayment?: TypePayment;
  sort?: "accumulate";
  page?: number;
  limit?: number;
}

// Contrato de Lógica de Negocio
export interface ITransactionsService {
  getTransactions(
    filters?: TransactionsFilters
  ): Promise<TransactionsResponseDTO[]>;

  getTransactionById(id: number): Promise<TransactionsResponseDTO>;

  createPaymentTransaction(
    transaction: TransactionsRequestDTO
  ): Promise<TransactionsResponseDTO>;
}