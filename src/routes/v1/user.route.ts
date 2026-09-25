import { Router } from "express";
import { container } from "../../config/container";
import { UserController } from "../../controllers/users.controller";

const router = Router();

router.post("/", async (req, res) => {
    const controller = 
    container.resolve<UserController>("userController");
    return controller.createUser(req, res);
});

router.patch("/:id", async (req, res) => {
    const controller = 
    container.resolve<UserController>("userController");
    return controller.updateUser(req, res);
});

export default router;