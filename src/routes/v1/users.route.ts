import { Router } from "express";
import { makeInvoker } from "awilix-express";
import { UsersController } from "../../controllers/users.controller";

const router = Router();

// Inyecta automáticamente el contenedor y vincula las funciones del controlador
const api = makeInvoker(UsersController);

// POST /example-api/v1/users -> Crear un nuevo usuario
router.post("/", api("createUser"));

// PUT /example-api/v1/users/:id -> Actualizar un usuario existente por su ID
router.put("/:id", api("updateUser"));

export default router;