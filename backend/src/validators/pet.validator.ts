import { z } from "zod";
import { registry } from "../docs/swagger";

export const PetBodySchema = z.object({
  name: z.string().min(2).max(50).describe("Nombre de la mascota"),
  type: z.enum(["perro", "gato", "conejo", "ave"]).describe("Tipo de mascota"),
  age: z.number().int().min(0).max(30).describe("Edad de la mascota"),
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
