import { registry } from "./swagger";
import {
  LoginBodySchema,
  RegisterBodySchema,
  ChangePasswordBodySchema,
} from "../validators/auth.validator";
import {
  PetBodySchema,
  PetIdSchema,
  DeleteImageParamsSchema,
  GetPetsQuerySchema,
} from "../validators/pet.validator";
import {
  CreateAdoptionRequestBodySchema,
  CreateAdoptionRequestParamsSchema,
  ReviewAdoptionRequestBodySchema,
  AdoptionRequestIdParamsSchema,
  AdoptionStatusQuerySchema,
} from "../validators/adoption.validator";

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

registry.registerPath({
  method: "get",
  path: "/api/v1/auth/my-pets",
  tags: ["Auth"],
  summary: "Obtener mis mascotas",
  description: "Obtiene las mascotas adoptadas por el usuario autenticado",
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: "Mascotas obtenidas exitosamente" },
    401: { description: "No autenticado" },
    404: { description: "Usuario no encontrado" },
  },
});

/* ========= PETS ========= */

registry.registerPath({
  method: "get",
  path: "/api/v1/pets",
  tags: ["Pets"],
  summary: "Listar mascotas con filtros y paginación",
  description: `Obtiene la lista de mascotas con múltiples opciones de filtrado y paginación.

**Filtros disponibles:**
- adopted: Estado de adopción (true/false)
- type: Tipo de mascota (perro/gato)
- gender: Género (macho/hembra)
- size: Tamaño (pequeño/mediano/grande/extra grande)
- isSterilized: Si está esterilizada (true/false)
- isVaccinated: Si está vacunada (true/false)
- minAge: Edad mínima en años
- maxAge: Edad máxima en años
- search: Búsqueda por nombre, raza o descripción

**Paginación:**
- page: Número de página (default: 1)
- limit: Elementos por página (default: 10, max: 100)

**Ordenamiento:**
- sortBy: Campo de ordenamiento (createdAt/name/birthDate, default: createdAt)
- order: Orden (asc/desc, default: desc)`,
  request: {
    query: GetPetsQuerySchema,
  },
  responses: {
    200: {
      description:
        "Lista de mascotas obtenida exitosamente con información de paginación",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: true },
              data: {
                type: "array",
                items: {
                  type: "object",
                  description: "Objeto de mascota",
                },
              },
              pagination: {
                type: "object",
                properties: {
                  currentPage: { type: "number", example: 1 },
                  totalPages: { type: "number", example: 5 },
                  totalItems: { type: "number", example: 47 },
                  itemsPerPage: { type: "number", example: 10 },
                  hasNextPage: { type: "boolean", example: true },
                  hasPrevPage: { type: "boolean", example: false },
                },
              },
            },
          },
        },
      },
    },
    400: { description: "Parámetros de consulta inválidos" },
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

registry.registerPath({
  method: "post",
  path: "/api/v1/pets/{id}/images",
  tags: ["Pets"],
  summary: "Subir imágenes de mascota",
  description:
    "Permite a un admin subir hasta 5 imágenes de una mascota (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: PetIdSchema,
    body: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              images: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description:
                  "Imágenes de la mascota (JPG, PNG o WEBP, máximo 5MB cada una, hasta 5 imágenes)",
              },
            },
            required: ["images"],
          },
        },
      },
    },
  },
  responses: {
    200: { description: "Imágenes subidas exitosamente" },
    400: { description: "Imágenes no válidas o mascota no encontrada" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Mascota no encontrada" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/v1/pets/{id}/images/{publicId}",
  tags: ["Pets"],
  summary: "Eliminar imagen de mascota",
  description:
    "Permite a un admin eliminar una imagen específica de una mascota (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: DeleteImageParamsSchema,
  },
  responses: {
    200: { description: "Imagen eliminada exitosamente" },
    400: { description: "Mascota sin imágenes" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Mascota o imagen no encontrada" },
  },
});

/* ========= ADOPTIONS ========= */

// Users routes

registry.registerPath({
  method: "post",
  path: "/api/v1/adoptions/pets/{petId}/request",
  tags: ["Adoptions"],
  summary: "Crear solicitud de adopción",
  description:
    "Permite a un usuario autenticado crear una solicitud para adoptar una mascota disponible",
  security: [{ bearerAuth: [] }],
  request: {
    params: CreateAdoptionRequestParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: CreateAdoptionRequestBodySchema,
        },
      },
    },
  },
  responses: {
    201: { description: "Solicitud de adopción creada exitosamente" },
    400: {
      description:
        "ID inválido, mascota ya adoptada o ya existe una solicitud pendiente",
    },
    401: { description: "No autenticado" },
    404: { description: "Mascota no encontrada" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/adoptions/my-requests",
  tags: ["Adoptions"],
  summary: "Obtener mis solicitudes de adopción",
  description:
    "Obtiene todas las solicitudes de adopción del usuario autenticado. Puede filtrar por estado (pending, approved, rejected, cancelled)",
  security: [{ bearerAuth: [] }],
  request: {
    query: AdoptionStatusQuerySchema,
  },
  responses: {
    200: { description: "Solicitudes obtenidas exitosamente" },
    401: { description: "No autenticado" },
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/v1/adoptions/requests/{requestId}/cancel",
  tags: ["Adoptions"],
  summary: "Cancelar solicitud de adopción",
  description:
    "Permite a un usuario cancelar su propia solicitud de adopción pendiente",
  security: [{ bearerAuth: [] }],
  request: {
    params: AdoptionRequestIdParamsSchema,
  },
  responses: {
    200: { description: "Solicitud cancelada exitosamente" },
    400: {
      description:
        "ID inválido o solo se pueden cancelar solicitudes pendientes",
    },
    401: { description: "No autenticado" },
    403: { description: "Solo puedes cancelar tus propias solicitudes" },
    404: { description: "Solicitud no encontrada" },
  },
});

// Admin routes

registry.registerPath({
  method: "get",
  path: "/api/v1/adoptions/requests",
  tags: ["Adoptions"],
  summary: "Obtener todas las solicitudes (Admin)",
  description:
    "Obtiene todas las solicitudes de adopción. Puede filtrar por estado (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    query: AdoptionStatusQuerySchema,
  },
  responses: {
    200: { description: "Solicitudes obtenidas exitosamente" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/adoptions/requests/{requestId}",
  tags: ["Adoptions"],
  summary: "Obtener solicitud por ID (Admin)",
  description:
    "Obtiene los detalles de una solicitud de adopción específica (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: AdoptionRequestIdParamsSchema,
  },
  responses: {
    200: { description: "Solicitud obtenida exitosamente" },
    400: { description: "ID inválido" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Solicitud no encontrada" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/adoptions/pets/{petId}/requests",
  tags: ["Adoptions"],
  summary: "Obtener solicitudes de una mascota (Admin)",
  description:
    "Obtiene todas las solicitudes de adopción para una mascota específica (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: CreateAdoptionRequestParamsSchema,
  },
  responses: {
    200: { description: "Solicitudes obtenidas exitosamente" },
    400: { description: "ID inválido" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/v1/adoptions/requests/{requestId}/approve",
  tags: ["Adoptions"],
  summary: "Aprobar solicitud de adopción (Admin)",
  description:
    "Aprueba una solicitud de adopción, marca la mascota como adoptada y rechaza automáticamente otras solicitudes pendientes para la misma mascota (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: AdoptionRequestIdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: ReviewAdoptionRequestBodySchema,
        },
      },
    },
  },
  responses: {
    200: { description: "Solicitud aprobada exitosamente" },
    400: {
      description:
        "ID inválido, solo se pueden aprobar solicitudes pendientes o mascota ya adoptada",
    },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Solicitud o mascota no encontrada" },
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/v1/adoptions/requests/{requestId}/reject",
  tags: ["Adoptions"],
  summary: "Rechazar solicitud de adopción (Admin)",
  description: "Rechaza una solicitud de adopción pendiente (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: AdoptionRequestIdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: ReviewAdoptionRequestBodySchema,
        },
      },
    },
  },
  responses: {
    200: { description: "Solicitud rechazada exitosamente" },
    400: {
      description:
        "ID inválido o solo se pueden rechazar solicitudes pendientes",
    },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Solicitud no encontrada" },
  },
});
