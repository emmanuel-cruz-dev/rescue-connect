import { z } from "zod";
import { registry } from "../docs/swagger";

export const PetBodySchema = z.object({
  name: z.string().min(2).max(50).describe("Nombre de la mascota"),
  type: z.enum(["perro", "gato"]).describe("Tipo de mascota"),
  birthDate: z.coerce
    .date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura")
    .describe("Fecha de nacimiento de la mascota"),
  gender: z.enum(["macho", "hembra"]),
  size: z.enum(["pequeño", "mediano", "grande", "extra grande"]),
  breed: z.string().min(2).max(50).describe("Raza de la mascota"),
  description: z
    .string()
    .max(500)
    .optional()
    .describe("Descripción de la mascota"),
  isSterilized: z
    .boolean()
    .describe("Si la mascota está esterilizada")
    .default(false),
  isVaccinated: z
    .boolean()
    .describe("Si la mascota está vacunada")
    .default(false),
  adopted: z.boolean().optional().describe("Si la mascota ha sido adoptada"),
});

export const PetIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido"),
});

export const DeleteImageParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de mascota inválido"),
  publicId: z.string().min(1, "Public ID es requerido"),
});

registry.register("PetBody", PetBodySchema);
registry.register("PetId", PetIdSchema);

export const createPetSchema = z.object({
  body: PetBodySchema,
});

export const updatePetSchema = z.object({
  body: PetBodySchema.partial(),
  params: PetIdSchema,
});

export const petIdSchema = z.object({
  params: PetIdSchema,
});

export const GetPetsQuerySchema = z.object({
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

  adopted: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => val === "true")
    .describe("Filtrar por estado de adopción"),

  type: z.enum(["perro", "gato"]).optional().describe("Tipo de mascota"),

  gender: z.enum(["macho", "hembra"]).optional().describe("Género"),

  size: z
    .enum(["pequeño", "mediano", "grande", "extra grande"])
    .optional()
    .describe("Tamaño"),

  minAge: z.coerce.number().min(0).optional().describe("Edad mínima en años"),
  maxAge: z.coerce.number().min(0).optional().describe("Edad máxima en años"),

  search: z
    .string()
    .optional()
    .describe("Buscar por nombre, raza o descripción"),

  isSterilized: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => val === "true")
    .describe("Filtrar por esterilización"),

  isVaccinated: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => val === "true")
    .describe("Filtrar por vacunación"),

  sortBy: z
    .enum(["createdAt", "name", "birthDate"])
    .default("createdAt")
    .describe("Campo por el cual ordenar"),

  order: z
    .enum(["asc", "desc"])
    .default("desc")
    .describe("Orden ascendente o descendente"),
});

registry.register("GetPetsQuery", GetPetsQuerySchema);

export const getPetsSchema = z.object({
  query: GetPetsQuerySchema,
});

export const deleteImageSchema = z.object({
  params: DeleteImageParamsSchema,
});
