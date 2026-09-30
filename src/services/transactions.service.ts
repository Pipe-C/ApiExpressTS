import {
  TransactionsRequestDTO,
  TransactionsResponseDTO,
} from "../dto/transactions.dto";
import {
  TransactionStatus,
  TypePayment,
} from "../data/models/transactions.model";
import { AppException } from "../exceptions/app.exception";
import { AppErrors } from "../exceptions/errors/app.error";
import { ITransactionsRepository } from "../repositories/interfaces/transactions.interface";
import {
  ITransactionsService,
  TransactionsFilters,
} from "../services/interfaces/transaction.interface";

export class TransactionsService implements ITransactionsService {
  constructor(
    private readonly transactionsRepository: ITransactionsRepository
  ) {}

  public async getTransactions(
    filters?: TransactionsFilters
  ): Promise<TransactionsResponseDTO[]> {
    const transactions = await this.transactionsRepository.getTransactions(filters);

    return transactions.map((t) => ({
      id: t.id,
      amount: t.amount,
      accumulate: t.accumulate,
      typePayment: t.typePayment,
      status: t.status,
      createdAt: t.createdAt?.toISOString(),
    }));
  }

  public async getTransactionById(
    id: number
  ): Promise<TransactionsResponseDTO> {
    if (isNaN(id) || id <= 0) {
      throw new AppException(AppErrors.TRANSACTION_INVALID_ID);
    }

    // Usando el repositorio en lugar del array directo
    const transaction = await this.transactionsRepository.getTransactionById(id);

    if (!transaction) {
      throw new AppException(AppErrors.TRANSACTION_NOT_FOUND);
    }

    return {
      id: transaction.id,
      amount: transaction.amount,
      accumulate: transaction.accumulate,
      typePayment: transaction.typePayment,
      status: transaction.status,
      createdAt: transaction.createdAt?.toISOString(),
    };
  }

  public async createPaymentTransaction(
    transactionDto: TransactionsRequestDTO
  ): Promise<TransactionsResponseDTO> {
    if (typeof transactionDto.amount !== "number" || transactionDto.amount <= 0) {
      throw new AppException(AppErrors.TRANSACTION_INVALID_AMOUNT);
    }

    // Regla de Negocio: 1 punto acumulado por cada 1000 de monto
    const accumulate = Math.floor(transactionDto.amount / 1000);

    // Delegando la creación y asignación de ID al Repositorio
    const createdTransaction = await this.transactionsRepository.createTransaction({
      amount: transactionDto.amount,
      accumulate,
      typePayment: transactionDto.typePayment,
      status: TransactionStatus.COMPLETED,
    });

    return {
      id: createdTransaction.id,
      amount: createdTransaction.amount,
      accumulate: createdTransaction.accumulate,
      typePayment: createdTransaction.typePayment,
      status: createdTransaction.status,
      createdAt: createdTransaction.createdAt?.toISOString(),
    };
  }
}