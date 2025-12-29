import { registry } from "./swagger";
import {
  LoginBodySchema,
  RegisterBodySchema,
  ChangePasswordBodySchema,
} from "../validators/auth.validator";
import { PetBodySchema, PetIdSchema } from "../validators/pet.validator";

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
    400: { description: "Datos inválidos" },
    409: { description: "El email ya está registrado" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/auth/profile",
  tags: ["Auth"],
  summary: "Obtener perfil",
  description: "Obtiene el perfil del usuario autenticado",
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: "Perfil obtenido exitosamente" },
    401: { description: "No autenticado" },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/v1/auth/profile",
  tags: ["Auth"],
  summary: "Actualizar perfil",
  description: "Actualiza los datos del perfil del usuario autenticado",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: RegisterBodySchema.omit({
            email: true,
            password: true,
          }).partial(),
        },
      },
    },
  },
  responses: {
    200: { description: "Perfil actualizado exitosamente" },
    400: { description: "Datos inválidos" },
    401: { description: "No autenticado" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/auth/change-password",
  tags: ["Auth"],
  summary: "Cambiar contraseña",
  description: "Cambia la contraseña del usuario autenticado",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ChangePasswordBodySchema,
        },
      },
    },
  },
  responses: {
    200: { description: "Contraseña cambiada exitosamente" },
    400: { description: "Contraseña actual incorrecta" },
    401: { description: "No autenticado" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/auth/logout",
  tags: ["Auth"],
  summary: "Cerrar sesión",
  description: "Cierra la sesión del usuario autenticado",
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: "Sesión cerrada exitosamente" },
    401: { description: "No autenticado" },
  },
});

/* ========= PETS ========= */

registry.registerPath({
  method: "get",
  path: "/api/v1/pets",
  tags: ["Pets"],
  summary: "Listar mascotas",
  description: "Obtiene la lista de todas las mascotas disponibles",
  responses: {
    200: { description: "Lista de mascotas obtenida exitosamente" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/pets/{id}",
  tags: ["Pets"],
  summary: "Obtener mascota por ID",
  description: "Obtiene los detalles de una mascota específica",
  request: {
    params: PetIdSchema,
  },
  responses: {
    200: { description: "Mascota obtenida exitosamente" },
    400: { description: "ID inválido" },
    404: { description: "Mascota no encontrada" },
  },
});

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
    201: { description: "Mascota creada exitosamente" },
    400: { description: "Datos inválidos" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/v1/pets/{id}",
  tags: ["Pets"],
  summary: "Actualizar mascota",
  description: "Actualiza los datos de una mascota existente (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: PetIdSchema,
    body: {
      content: {
        "application/json": {
          schema: PetBodySchema.partial(),
        },
      },
    },
  },
  responses: {
    200: { description: "Mascota actualizada exitosamente" },
    400: { description: "Datos inválidos" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Mascota no encontrada" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/v1/pets/{id}",
  tags: ["Pets"],
  summary: "Eliminar mascota",
  description: "Elimina una mascota de la base de datos (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: PetIdSchema,
  },
  responses: {
    200: { description: "Mascota eliminada exitosamente" },
    400: { description: "ID inválido" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Mascota no encontrada" },
  },
});
