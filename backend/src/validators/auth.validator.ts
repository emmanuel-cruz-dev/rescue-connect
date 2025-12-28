import { z } from "zod";
import { registry } from "../docs/swagger";

export const LoginBodySchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .toLowerCase()
    .describe("Email del usuario"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .describe("Contraseña del usuario"),
});

export const RegisterBodySchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .toLowerCase()
    .describe("Email del usuario"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña no puede superar 100 caracteres")
    .describe("Contraseña del usuario (mínimo 8 caracteres)"),
  firstName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar 50 caracteres")
    .trim()
    .describe("Nombre del usuario"),
  lastName: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede superar 50 caracteres")
    .trim()
    .describe("Apellido del usuario"),
  phone: z
    .string()
    .min(8, "El número de teléfono debe tener al menos 8 caracteres")
    .max(50, "El número de teléfono no puede superar 50 caracteres")
    .trim()
    .describe("Número de teléfono"),
  address: z
    .string()
    .min(2, "La dirección debe tener al menos 2 caracteres")
    .max(200, "La dirección no puede superar 200 caracteres")
    .trim()
    .describe("Dirección del usuario"),
});

export const UserIdSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "ID de MongoDB inválido")
    .describe("ID del usuario"),
});

export const ChangePasswordBodySchema = z.object({
  currentPassword: z
    .string()
    .min(1, "La contraseña actual es obligatoria")
    .describe("Contraseña actual"),
  newPassword: z
    .string()
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
    .max(100, "La nueva contraseña no puede superar 100 caracteres")
    .describe("Nueva contraseña (mínimo 8 caracteres)"),
});

registry.register("LoginBody", LoginBodySchema);
registry.register("RegisterBody", RegisterBodySchema);
registry.register("UserId", UserIdSchema);
registry.register("ChangePasswordBody", ChangePasswordBodySchema);

export const loginSchema = z.object({
  body: LoginBodySchema,
});

export const registerSchema = z.object({
  body: RegisterBodySchema,
});

export const updateUserSchema = z.object({
  body: RegisterBodySchema.omit({ email: true, password: true }).partial(),
  params: UserIdSchema,
});

export const changePasswordSchema = z.object({
  body: ChangePasswordBodySchema,
});
