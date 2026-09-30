import { Request, Response } from "express";
import { UserRequestDTO } from "../dto/users.dto"; 
import { IUserService } from "../services/interfaces/users.interface";

export class UsersController {
  constructor(
    private readonly userService: IUserService
  ) {}

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const request: UserRequestDTO = req.body;

    const result = await this.userService.createUser(request);

    res.status(201).json({
      status: "success",
      message: "Usuario creado exitosamente",
      data: result,
    });
  };

  public updateUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const request: UserRequestDTO = req.body;

    if (typeof id !== "string" || id.trim() === "") {
      res.status(400).json({
        status: "error",
        message: "El parámetro 'id' del usuario es requerido.",
      });
      return;
    }

    const result = await this.userService.updateUser(request, id);

    res.status(200).json({
      status: "success",
      message: "Usuario actualizado exitosamente",
      data: result,
    });
  };
}