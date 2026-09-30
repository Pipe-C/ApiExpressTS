export interface IErrorSpec {
  code: string;
  message: string;
  statusCode: number;
}

export class AppException extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(code: string, message: string, statusCode?: number);
  constructor(errorSpec: IErrorSpec);
  constructor(
    codeOrSpec: string | IErrorSpec,
    message?: string,
    statusCode: number = 400
  ) {
    if (typeof codeOrSpec === "object") {
      super(codeOrSpec.message);
      this.code = codeOrSpec.code;
      this.statusCode = codeOrSpec.statusCode;
    } else {
      super(message || "An error occurred");
      this.code = codeOrSpec;
      this.statusCode = statusCode;
    }

    // Corrige el prototipo para que 'instanceof' funcione correctamente
    Object.setPrototypeOf(this, new.target.prototype);

    // Mantiene un Stack Trace limpio para logs y depuración
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}