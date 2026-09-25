import { Router } from "express";
import { container } from "../../config/container";
import { UserController } from "../../controllers/health.controller";

const router = Router();

router.get("/", async (req, res) => {
    const controller = 
    container.resolve<UserController>("healthController");
    return controller.health(req, res);
});

export default router;