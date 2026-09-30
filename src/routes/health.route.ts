import { Router } from "express";
import { makeInvoker } from "awilix-express";
import { HealthController } from "../controllers/health.controller";

const router = Router();

// Vincula la ruta directamente al método "health" de "healthController"
const api = makeInvoker(HealthController);

router.get("/", api("health"));

export default router;