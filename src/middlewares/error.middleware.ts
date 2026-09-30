import { Request, Response, NextFunction } from "express";
import { AppException } from "../exceptions/app.exception";
import { logger } from "../config/logger"; 
import { env } from "../config/env"; 

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
     
  // Manejo de excepciones controladas (AppException)
  if (err instanceof AppException) {
    logger.warn(`[Controlled Error] ${req.method} ${req.originalUrl} - Code: ${err.code} | Message: ${err.message}`);

    res.status(err.statusCode).json({
      status: "error",
      code: err.code,
      message: err.message,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Manejo de error por JSON mal formado en la petición
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      status: "error",
      code: "INVALID_JSON_BODY",
      message: "El cuerpo de la petición no contiene un JSON válido",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Manejo de Errores Inesperados (HTTP 500)
  // Registrando el error completo con su stack trace en los logs del servidor
  logger.error(`[Unhandled Error] ${req.method} ${req.originalUrl} - ${err.message}`, {
    stack: err.stack,
  });

  res.status(500).json({
    status: "error",
    code: "INTERNAL_SERVER_ERROR",
    message: "Ha ocurrido un error interno e inesperado en el servidor",
    timestamp: new Date().toISOString(),
    // Muestra el stack de error solo en ambiente de desarrollo para facilitar la depuración
    ...(env.isDevelopment && { stack: err.stack }),
  });
};