import { Router, Request, Response } from "express";
import usersRoutes from "./users.route";
import transactionsRoutes from "./transactions.route";

const router = Router();

// --- Definición de Sub-Rutas por Módulo ---
router.use("/users", usersRoutes);
router.use("/transactions", transactionsRoutes);

// Endpoint informativo sobre la versión v1
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    version: "v1",
    modules: ["users", "transactions"],
    status: "active",
  });
});

export default router;