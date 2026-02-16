import { z } from "zod";
import { registry } from "../docs/swagger";

export const PetBodySchema = z.object({
  name: z.string().min(2).max(50).describe("Nombre de la mascota"),
  type: z.enum(["perro", "gato"]).describe("Tipo de mascota"),
  birthDate: z.coerce
    .date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura")
    .describe("Fecha de nacimiento de la mascota"),
  breed: z.string().min(2).max(50).describe("Raza de la mascota"),
  description: z
    .string()
    .max(500)
    .optional()
    .describe("Descripción de la mascota"),
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
  adopted: z
    .enum(["true", "false"])
    .optional()
    .describe("Filtrar por estado de adopción"),
});

registry.register("GetPetsQuery", GetPetsQuerySchema);

export const getPetsSchema = z.object({
  query: GetPetsQuerySchema,
});

export const deleteImageSchema = z.object({
  params: DeleteImageParamsSchema,
});
