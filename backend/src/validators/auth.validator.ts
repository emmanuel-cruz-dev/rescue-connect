import { z } from "zod";

import { registry } from "../docs/swagger";
import {
  EmailField,
  PasswordField,
  FirstNameField,
  LastNameField,
  PhoneField,
  AddressField,
  MongoIdSchema,
  ChangePasswordBody,
} from "./shared.validator";

export const LoginBodySchema = z.object({
  email: EmailField,
  password: PasswordField,
});

export const RegisterBodySchema = z.object({
  email: EmailField,
  password: PasswordField,
  firstName: FirstNameField,
  lastName: LastNameField,
  phone: PhoneField,
  address: AddressField,
});

export const UserIdSchema = MongoIdSchema;

export const ChangePasswordBodySchema = ChangePasswordBody;

registry.register("LoginBody", LoginBodySchema);
registry.register("RegisterBody", RegisterBodySchema);
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

export const ForgotPasswordBodySchema = z.object({
  email: EmailField,
});

export const ResetPasswordBodySchema = z.object({
  newPassword: PasswordField.describe("Nueva contraseña (mínimo 8 caracteres)"),
});

export const ResetPasswordParamsSchema = z.object({
  token: z
    .string()
    .min(1, "El token es obligatorio")
    .describe("Token de recuperación recibido por email"),
});

registry.register("ForgotPasswordBody", ForgotPasswordBodySchema);
registry.register("ResetPasswordBody", ResetPasswordBodySchema);
registry.register("ResetPasswordParams", ResetPasswordParamsSchema);

export const forgotPasswordSchema = z.object({
  body: ForgotPasswordBodySchema,
});

export const resetPasswordSchema = z.object({
  body: ResetPasswordBodySchema,
  params: z.object({
    token: z.string().min(1, "El token es obligatorio"),
  }),
});
