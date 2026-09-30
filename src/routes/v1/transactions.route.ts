import { Router } from "express";
import { makeInvoker } from "awilix-express";
import { TransactionsController } from "../../controllers/transactions.controller";

const router = Router();

// Inyecta automáticamente el contenedor y mapea a las funciones del controlador
const api = makeInvoker(TransactionsController);

// GET /example-api/v1/transactions
router.get("/", api("getTransactions"));

// POST /example-api/v1/transactions
router.post("/", api("createPaymentTransaction"));

// GET /example-api/v1/transactions/:id
// Nota: Si usaste el nombre refactorizado del método, usa 'getTransactionById', si no, 'getTransactionXId'
router.get("/:id", api("getTransactionById"));

export default router;