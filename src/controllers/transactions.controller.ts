import { Request, Response } from "express";
import { TransactionsRequestDTO } from "../dto/transactions.dto";
import {
  TransactionsFilters,
  ITransactionsService,
} from "../services/interfaces/transaction.interface";

import { TransactionStatus, TypePayment } from "../data/models/transactions.model";

export class TransactionsController {
  constructor(private readonly transactionsService: ITransactionsService) {}

  public getTransactions = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const filters: TransactionsFilters = {
      status: req.query.status as TransactionStatus | undefined,
      typePayment: req.query.typePayment as TypePayment | undefined,
      sort: req.query.sort as "accumulate" | undefined,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    const result = await this.transactionsService.getTransactions(filters);

    res.status(200).json({
      status: "success",
      data: result,
    });
  };

  public getTransactionById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = Number(req.params.id);

    // La validación se delega o se pasa limpia al servicio
    const result = await this.transactionsService.getTransactionById(id);

    res.status(200).json({
      status: "success",
      data: result,
    });
  };

  public createPaymentTransaction = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    // Usamos el tipo en singular
    const request: TransactionsRequestDTO = req.body;

    const result = await this.transactionsService.createPaymentTransaction(request);

    res.status(201).json({
      status: "success",
      message: "Transacción creada exitosamente",
      data: result,
    });
  };
}