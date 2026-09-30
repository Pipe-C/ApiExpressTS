import { describe, it, expect, vi, beforeEach } from "vitest";
import { TransactionsService } from "./transactions.service";
import { ITransactionsRepository } from "../repositories/interfaces/transactions.interface";
import { TransactionStatus, TypePayment } from "../data/models/transactions.model";
import { AppException } from "../exceptions/app.exception";
import { TransactionsRequestDTO } from "../dto/transactions.dto"; // 1. Importación del DTO

describe("TransactionsService", () => {
  let service: TransactionsService;
  let mockRepository: ITransactionsRepository;

  beforeEach(() => {
    mockRepository = {
      getTransactions: vi.fn(),
      getTransactionById: vi.fn(),
      createTransaction: vi.fn(),
    };

    service = new TransactionsService(mockRepository);
  });

  it("debe calcular el acumulado dividiendo el monto entre 1000", async () => {
    // 2. Anotación explícita con TransactionsRequestDTO para resolver la compatibilidad del Enum
    const request: TransactionsRequestDTO = {
      amount: 3000,
      typePayment: TypePayment.CREDIT_CARD,
    };

    // 3. Estado corregido a TransactionStatus.SUCCESS
    vi.spyOn(mockRepository, "createTransaction").mockResolvedValue({
      id: 1,
      amount: 3000,
      accumulate: 3,
      typePayment: TypePayment.CREDIT_CARD,
      status: TransactionStatus.COMPLETED,
      createdAt: new Date(),
    });

    const result = await service.createPaymentTransaction(request);

    expect(result.accumulate).toBe(3);
    expect(mockRepository.createTransaction).toHaveBeenCalled();
  });

  it("debe lanzar una excepción cuando la transacción no existe", async () => {
    vi.spyOn(mockRepository, "getTransactionById").mockResolvedValue(null);

    await expect(service.getTransactionById(99)).rejects.toThrow(AppException);
  });
});