import { z } from "zod";

export const createPetSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    type: z.enum(["perro", "gato", "conejo", "ave"]),
    age: z.number().int().min(0).max(30),
    breed: z.string().min(2).max(50),
    description: z.string().max(500).optional(),
    adopted: z.boolean().optional(),
  }),
});

export const updatePetSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    type: z.enum(["perro", "gato", "conejo", "ave"]).optional(),
    age: z.number().int().min(0).max(30).optional(),
    breed: z.string().min(2).max(50).optional(),
    description: z.string().max(500).optional(),
    adopted: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido"),
  }),
});

export const petIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido"),
  }),
});
