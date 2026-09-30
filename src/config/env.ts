import dotenv from "dotenv";
import { z } from "zod";

// Cargar las variables del archivo .env
dotenv.config();

// Carga segura del package.json
const packageJson = require("../../package.json");

// Definimos el esquema con validación de Zod
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(3000),
    SHOW_ENV: z.coerce.boolean().default(false),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
    HTTP_TIME_OUT: z.coerce.number().default(20000),
});

// Validando el process.env contra el esquema definido
const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
    console.error("Ha ocurrido un error en la configuración de las variables de entorno.");
    console.error(parseResult.error.format());
    process.exit(1);
}

const envVars = parseResult.data;

// Exportando el objeto tipado y validado
export const env = {
  nodeEnv: envVars.NODE_ENV,
  appName: packageJson.name || "express-api",
  appVersion: packageJson.version || "1.0.0",
  port: envVars.PORT,
  showEnv: envVars.SHOW_ENV,
  logLevel: envVars.LOG_LEVEL,
  httpConfig: {
    timeOut: envVars.HTTP_TIME_OUT,
  },
  isProduction: envVars.NODE_ENV === "production",
  isDevelopment: envVars.NODE_ENV === "development",
};