import { z } from "zod";

export const MongoIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de MongoDB inválido"),
});

export const EmailField = z
  .email("Email inválido")
  .toLowerCase()
  .min(5)
  .max(254)
  .describe("Email del usuario");

export const PasswordField = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(100, "La contraseña no puede superar 100 caracteres")
  .describe("Contraseña del usuario");

export const FirstNameField = z
  .string()
  .min(3, "El nombre debe tener al menos 3 caracteres")
  .max(50, "El nombre no puede superar 50 caracteres")
  .trim()
  .describe("Nombre del usuario");

export const LastNameField = z
  .string()
  .min(3, "El apellido debe tener al menos 3 caracteres")
  .max(50, "El apellido no puede superar 50 caracteres")
  .trim()
  .describe("Apellido del usuario");

const ARGENTINA_PHONE_REGEX =
  /^\+?(?:54\s?)?(?:9\s?)?(?:11|[2368]\d)[\s\-]?\d{4}[\s\-]?\d{4}$/;

export const PhoneField = z
  .string()
  .trim()
  .regex(
    ARGENTINA_PHONE_REGEX,
    "Teléfono inválido. Ingrese un número argentino válido (ej: +54 11 4323-5554)"
  )
  .describe("Teléfono del usuario");

export const AddressField = z
  .string()
  .min(5)
  .max(200)
  .trim()
  .describe("Dirección del usuario");

export const ChangePasswordBody = z.object({
  currentPassword: z
    .string()
    .min(1, "La contraseña actual es obligatoria")
    .describe("Contraseña actual"),
  newPassword: PasswordField.describe("Nueva contraseña (mínimo 8 caracteres)"),
});
