import {
  UserRequestDTO,
  UpdateUserRequestDTO,
  UserResponseDTO,
} from "../dto/users.dto"; // Importación correcta
import { AppException } from "../exceptions/app.exception";
import { AppErrors } from "../exceptions/errors/app.error";
import { IUserService } from "./interfaces/users.interface";

export class UserService implements IUserService {
  constructor() {}

  public async createUser(user: UserRequestDTO): Promise<UserResponseDTO> {
    if (!user.name || user.name.trim() === "") {
      throw new AppException(AppErrors.NAME_NOT_FOUND);
    }

    // Gerando un ID dinámico simulación de DB (p. ej. timestamp o UUID)
    const generatedId = Date.now().toString();

    const response: UserResponseDTO = {
      id: generatedId,
      name: user.name,
      lastName: user.lastName,
      fullName: `${user.name} ${user.lastName}`,
      age: user.age,
      status: true,
    };

    return response;
  }

  public async updateUser(
    user: UpdateUserRequestDTO,
    userId: string
  ): Promise<UserResponseDTO> {
    if (!userId || userId.trim() === "") {
      throw new AppException(AppErrors.USER_ID_MANDATORY);
    }

    // Simulando datos existentes previos
    const existingUser = {
      name: "Juan",
      lastName: "Pérez",
      age: 25,
    };

    const updatedName = user.name ?? existingUser.name;
    const updatedLastName = user.lastName ?? existingUser.lastName;

    const response: UserResponseDTO = {
      id: userId,
      name: updatedName,
      lastName: updatedLastName,
      fullName: `${updatedName} ${updatedLastName}`,
      age: user.age ?? existingUser.age,
      status: true,
    };

    return response;
  }
}