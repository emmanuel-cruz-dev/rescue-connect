import { registry } from "./swagger";
import {
  LoginBodySchema,
  RegisterBodySchema,
} from "../validators/auth.validator";
import { PetBodySchema } from "../validators/pet.validator";

/* ========= AUTH ========= */

registry.registerPath({
  method: "post",
  path: "/api/v1/auth/login",
  tags: ["Auth"],
  summary: "Iniciar sesión",
  description: "Autentica un usuario y devuelve un token JWT",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginBodySchema,
        },
      },
    },
  },
  responses: {
    200: { description: "Login exitoso" },
    401: { description: "Credenciales inválidas" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/auth/register",
  tags: ["Auth"],
  summary: "Registrar usuario",
  description: "Crea un nuevo usuario en la base de datos",
  request: {
    body: {
      content: {
        "application/json": {
          schema: RegisterBodySchema,
        },
      },
    },
  },
  responses: {
    201: { description: "Usuario registrado" },
    400: { description: "Credenciales inválidas" },
    409: { description: "El email ya está registrado" },
  },
});

/* ========= PETS ========= */

registry.registerPath({
  method: "post",
  path: "/api/v1/pets",
  tags: ["Pets"],
  summary: "Crear mascota",
  description: "Crea una nueva mascota en la base de datos (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: PetBodySchema,
        },
      },
    },
  },
  responses: {
    201: { description: "Mascota creada" },
    400: { description: "Datos de entrada inválidos" },
    401: { description: "No autenticado" },
    403: {
      description:
        "No tienes permisos para crear mascotas (requiere rol admin)",
    },
  },
});
