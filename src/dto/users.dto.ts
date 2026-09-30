import { z } from "zod";

// --- ESQUEMAS DE VALIDACIÓN (ZOD) ---

// Esquema para Creación
export const CreateUserSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  age: z.number().int().positive("La edad debe ser un número entero positivo"),
});

// Esquema para Actualización 
export const UpdateUserSchema = CreateUserSchema.partial();

// --- TIPOS INFERIDOS PARA TYPESCRIPT ---

export type UserRequestDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequestDTO = z.infer<typeof UpdateUserSchema>;

// DTO de Respuesta
export interface UserResponseDTO {
  id: string;
  name: string;
  lastName: string;
  fullName: string;
  age: number;
  status: boolean;
  createdAt?: string;
}