// 1. Clase para lanzar en Servicios y Repositorios
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(errorSpec: { code: string; message: string; statusCode: number }) {
    super(errorSpec.message);
    this.code = errorSpec.code;
    this.statusCode = errorSpec.statusCode;

    // Mantiene el rastreo de pila (stack trace) limpio en V8
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

// Errores centralizados
export const AppErrors = {
  // Errores de Usuario
  NAME_NOT_FOUND: {
    code: "NAME_NOT_FOUND",
    message: "The name field is required",
    statusCode: 400,
  },
  USER_INVALID_DATA: {
    code: "USER_INVALID_DATA",
    message: "Invalid user data provided",
    statusCode: 422,
  },
  USER_ID_MANDATORY: {
    code: "USER_ID_MANDATORY",
    message: "User ID is required",
    statusCode: 400,
  },
  USER_NOT_FOUND: {
    code: "USER_NOT_FOUND",
    message: "User not found",
    statusCode: 404,
  },

  // Errores de Transacciones
  TRANSACTION_INVALID_ID: {
    code: "TRANSACTION_INVALID_ID",
    message: "The transaction ID must be a valid positive number",
    statusCode: 400,
  },
  TRANSACTION_NOT_FOUND: {
    code: "TRANSACTION_NOT_FOUND",
    message: "Transaction not found",
    statusCode: 404,
  },
  TRANSACTION_INVALID_AMOUNT: {
    code: "TRANSACTION_INVALID_AMOUNT",
    message: "The transaction amount must be a number greater than 0",
    statusCode: 400,
  },

  // Errores Generales y Servicios Externos
  API_EXTERNAL_ERROR: {
    code: "EXTERNAL_SERVICE_ERROR",
    message: "External API integration service failed",
    statusCode: 502,
  },
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred on the server",
    statusCode: 500,
  },
} as const;