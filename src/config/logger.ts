import winston from "winston";
import { env } from "../config/env";

// Formato personalizado para consola en entorno local (Desarrollo)
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : "";
    return `[${timestamp}] [${level}]: ${message} ${metaString}`;
  })
);

// Formato estructurado JSON para producción (Cloud, Datadog, ELK)
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }), // Incluye el stack trace si se pasa un Error
  winston.format.json()
);

export const logger = winston.createLogger({
  level: env.logLevel || "info",
  format: env.isProduction ? productionFormat : consoleFormat,
  transports: [
    new winston.transports.Console(),
    
    // Trazabilidad: guardar errores en un archivo físico solo en producción
    ...(env.isProduction
      ? [
          new winston.transports.File({ filename: "logs/error.log", level: "error" }),
          new winston.transports.File({ filename: "logs/combined.log" }),
        ]
      : []),
  ],
});