import { z } from "zod";
import { registry } from "../docs/swagger";

export const AdoptionStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);

export const AdoptionStatusQuerySchema = z.object({
  status: AdoptionStatusSchema.optional(),
});

export const CreateAdoptionRequestBodySchema = z.object({
  message: z
    .string()
    .max(500, "El mensaje no puede superar 500 caracteres")
    .optional()
    .describe("Mensaje opcional del usuario explicando por qué quiere adoptar"),
});

export const CreateAdoptionRequestParamsSchema = z.object({
  petId: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de mascota inválido"),
});

export const ReviewAdoptionRequestBodySchema = z.object({
  adminNotes: z
    .string()
    .max(500, "Las notas no pueden superar 500 caracteres")
    .optional()
    .describe("Notas del administrador sobre la decisión"),
});

export const AdoptionRequestIdParamsSchema = z.object({
  requestId: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de solicitud inválido"),
});

registry.register("CreateAdoptionRequestBody", CreateAdoptionRequestBodySchema);
registry.register("ReviewAdoptionRequestBody", ReviewAdoptionRequestBodySchema);
registry.register("AdoptionStatusQuery", AdoptionStatusQuerySchema);

export const createAdoptionRequestSchema = z.object({
  params: CreateAdoptionRequestParamsSchema,
  body: CreateAdoptionRequestBodySchema,
});

export const reviewAdoptionRequestSchema = z.object({
  params: AdoptionRequestIdParamsSchema,
  body: ReviewAdoptionRequestBodySchema,
});

export const adoptionRequestIdSchema = z.object({
  params: AdoptionRequestIdParamsSchema,
});

export const getAdoptionRequestsQuerySchema = z.object({
  query: AdoptionStatusQuerySchema,
});
