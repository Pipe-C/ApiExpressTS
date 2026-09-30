import { z } from "zod";
import { TransactionStatus, TypePayment } from "../data/models/transactions.model";

// --- ESQUEMA DE VALIDACIÓN (ZOD V4) ---
export const CreateTransactionSchema = z.object({
  amount: z
    .number({ message: "El monto debe ser un número válido" })
    .positive("El monto de la transacción debe ser mayor a 0"),

  typePayment: z.enum([TypePayment.CREDIT_CARD, TypePayment.DEBIT_CARD, TypePayment.CASH], {
    message: "Tipo de pago no válido. Opciones permitidas: CREDIT_CARD, DEBIT_CARD, CASH",
  }),
});

// --- TIPOS INFERIDOS PARA TYPESCRIPT ---

// DTO de Entrada (Singular para alinearse con los controladores)
export type TransactionsRequestDTO = z.infer<typeof CreateTransactionSchema>;

// DTO de Salida
export interface TransactionsResponseDTO {
  id: number;
  amount: number;
  accumulate: number;
  typePayment: TypePayment;
  status: TransactionStatus;
  createdAt?: string;
}