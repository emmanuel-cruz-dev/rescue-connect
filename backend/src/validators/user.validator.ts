import { z } from "zod";
import { registry } from "../docs/swagger";

export const UserBodySchema = z.object({
  firstName: z.string().min(3).max(50).describe("Nombre del usuario"),
  lastName: z.string().min(3).max(50).describe("Apellido del usuario"),
  email: z.email().describe("Email del usuario"),
  password: z
    .string()
    .min(8, "La contraseña no puede ser menor de 8 caracteres")
    .describe("Contraseña del usuario"),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?(?:54\s?)?(?:9\s?)?(?:11|[2368]\d)[\s\-]?\d{4}[\s\-]?\d{4}$/,
      "Teléfono inválido. Ingrese un número argentino válido (ej: +54 11 4323-5554)"
    )
    .describe("Teléfono del usuario"),
  address: z.string().min(5).max(100).describe("Dirección del usuario"),
  role: z.enum(["admin", "user"]).default("user").describe("Rol del usuario"),
  isActive: z.boolean().default(true).describe("Si el usuario está activo"),
});

export const UserIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de usuario inválido"),
});

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
  body: z.object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
  }),
  params: UserIdSchema,
});

export const userIdSchema = z.object({
  params: UserIdSchema,
});

export const getUsersSchema = z.object({
  query: GetUsersQuerySchema,
});
