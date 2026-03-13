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

export const UserBodySchema = z.object({
  firstName: FirstNameField,
  lastName: LastNameField,
  email: EmailField,
  password: PasswordField,
  phone: PhoneField,
  address: AddressField,
  role: z.enum(["admin", "user"]).default("user").describe("Rol del usuario"),
  isActive: z.boolean().default(true).describe("Si el usuario está activo"),
});

export const UserIdSchema = MongoIdSchema;

export const GetUsersQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .default(1)
    .describe("Número de página"),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .default(10)
    .describe("Elementos por página"),
  role: z.enum(["admin", "user"]).optional().describe("Filtrar por rol"),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => val === "true")
    .describe("Filtrar por estado activo"),
  search: z.string().optional().describe("Buscar por nombre, apellido o email"),
  sortBy: z
    .enum(["createdAt", "firstName", "lastName", "email"])
    .default("createdAt")
    .describe("Campo por el cual ordenar"),
  order: z
    .enum(["asc", "desc"])
    .default("desc")
    .describe("Orden ascendente o descendente"),
});

registry.register("UserBody", UserBodySchema);
registry.register("UserId", UserIdSchema);
registry.register("GetUsersQuery", GetUsersQuerySchema);

export const createUserSchema = z.object({
  body: UserBodySchema,
});

export const updateUserSchema = z.object({
  body: UserBodySchema.omit({ password: true }).partial(),
  params: UserIdSchema,
});

export const updatePasswordSchema = z.object({
  body: ChangePasswordBody,
  params: UserIdSchema,
});

export const userIdSchema = z.object({
  params: UserIdSchema,
});

export const getUsersSchema = z.object({
  query: GetUsersQuerySchema,
});
