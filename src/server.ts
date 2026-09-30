import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { scopePerRequest } from "awilix-express";
import { container } from "./config/container";
import V1Router from "./routes/v1/index";
import healthRouter from "./routes/health.route";
import { errorMiddleware } from "./middlewares/error.middleware";

export const createServer = () => {
  const prefix = process.env.API_PREFIX || "/api";

  const app = express();

  // --- Middlewares de seguridad y logs ---
  app.use(helmet()); // Proteger cabeceras HTTP.
  app.use(cors()); // Habilitar peticiones de dominios.
  app.use(morgan("dev")); // Log de peticiones HTTP.

  // -- Para parsear el body ---
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // -- Inyección de dependencias ---
  app.use(scopePerRequest(container));

  // -- Rutas de la API ---
  app.use(`${prefix}/v1`, V1Router);
  app.use(`${prefix}/health`, healthRouter);

  // --- Manejo de errores ---
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      status: "error",
      message: "Cannot ${req.method} ${req.originalUrl} on this server.",
      code: "ROUTE_NOT_FOUND",
      timestamp: new Date().toISOString(),
    });
  });

  // --- Middleware de manejo de errores ---
  app.use(errorMiddleware);
  return app;
};
