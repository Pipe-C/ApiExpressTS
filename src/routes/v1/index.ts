import { Router } from "express";
import usesRoutes from "./user.route";

const router = Router();

router.use("/users", usesRoutes);

export default router;