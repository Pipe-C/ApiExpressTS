import { UserRequestDTO, UserResponseDTO } from "../dto/example.dto";
import { IUserInterface } from "./interfaces/users.interface";

export class UserService implements IUserInterface {
    constructor(){}

    async createUser(user: UserRequestDTO): Promise<UserResponseDTO> {
        const respose: UserResponseDTO = {
            id: "1",
            name: user.name,
            lastName: user.lastName,
            fullName: `${user.name} ${user.lastName}`,
            age: user.age,
            status: true
        };
        return respose;
    }

    async updateUser(userId: string, user: UserRequestDTO): Promise<UserResponseDTO> {
        const respose: UserResponseDTO = {
            id: userId,
            name: user.name,
            lastName: user.lastName,
            fullName: `${user.name} ${user.lastName}`,
            age: user.age,
            status: true
        };
        return respose;
    }
}
