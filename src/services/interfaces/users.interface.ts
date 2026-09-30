import {
  UserRequestDTO,
  UpdateUserRequestDTO,
  UserResponseDTO,
} from "../../dto/users.dto"; 

export interface IUserService {
  createUser(user: UserRequestDTO): Promise<UserResponseDTO>;
  updateUser(
    user: UpdateUserRequestDTO,
    userId: string
  ): Promise<UserResponseDTO>;
}