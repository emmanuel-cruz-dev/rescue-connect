import { registry } from "./swagger";
import {
  LoginBodySchema,
  RegisterBodySchema,
  ChangePasswordBodySchema,
  ForgotPasswordBodySchema,
  ResetPasswordBodySchema,
  ResetPasswordParamsSchema,
} from "../validators/auth.validator";
import {
  UserBodySchema,
  UserIdSchema,
  GetUsersQuerySchema,
} from "../validators/user.validator";
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
  GetAdoptionRequestsQuerySchema,
  MonthlyStatsQuerySchema,
} from "../validators/adoption.validator";

/* ========= SYSTEM ========= */

registry.registerPath({
  method: "get",
  path: "/api/v1/health",
  tags: ["System"],
  summary: "Estado del servidor",
  description: "Verifica si el servidor está activo y devuelve la fecha actual",
  responses: {
    200: {
      description: "Servidor operativo",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "available" },
              timestamp: {
                type: "string",
                format: "date-time",
                example: "2026-03-20",
              },
            },
          },
        },
      },
    },
  },
});

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
  method: "delete",
  path: "/api/v1/auth/profile",
  tags: ["Auth"],
  summary: "Eliminar cuenta",
  description:
    "Elimina permanentemente la cuenta del usuario autenticado y anonimiza su historial de adopciones",
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: "Cuenta eliminada exitosamente" },
    401: { description: "No autenticado" },
    404: { description: "Usuario no encontrado" },
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

registry.registerPath({
  method: "post",
  path: "/api/v1/auth/forgot-password",
  tags: ["Auth"],
  summary: "Solicitar recuperación de contraseña",
  description:
    "Envía un correo con un enlace para restablecer la contraseña. Siempre responde con éxito para no revelar si el email existe.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ForgotPasswordBodySchema,
        },
      },
    },
  },
  responses: {
    200: { description: "Correo enviado (si el email está registrado)" },
    400: { description: "Datos inválidos" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/auth/reset-password/{token}",
  tags: ["Auth"],
  summary: "Restablecer contraseña",
  description:
    "Restablece la contraseña usando el token recibido por correo. El token expira en 1 hora.",
  request: {
    params: ResetPasswordParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: ResetPasswordBodySchema,
        },
      },
    },
  },
  responses: {
    200: { description: "Contraseña actualizada exitosamente" },
    400: { description: "Token inválido o expirado" },
  },
});

/* ========= ADMIN ========= */

registry.registerPath({
  method: "get",
  path: "/api/v1/admin/dashboard",
  tags: ["Admin"],
  summary: "Estadísticas del dashboard",
  description:
    "Obtiene estadísticas generales para el panel de administración. Solo accesible para administradores.",
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Estadísticas obtenidas exitosamente",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "success" },
              data: {
                type: "object",
                properties: {
                  users: { type: "number", example: 54 },
                  pets: { type: "number", example: 32 },
                  adopted: { type: "number", example: 18 },
                  availablePets: { type: "number", example: 14 },
                  pendingRequests: { type: "number", example: 6 },
                  approvedRequests: { type: "number", example: 20 },
                  rejectedRequests: { type: "number", example: 3 },
                },
              },
            },
          },
        },
      },
    },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
  },
});

/* ========= USERS ========= */

registry.registerPath({
  method: "get",
  path: "/api/v1/users",
  tags: ["Users"],
  summary: "Listar usuarios con filtros y paginación",
  description: `Obtiene la lista de usuarios con múltiples opciones de filtrado y paginación. Solo accesible para administradores.

**Filtros disponibles:**
- role: Rol del usuario (admin/user)
- isActive: Estado del usuario (true/false)
- search: Búsqueda por nombre, apellido o email

**Paginación:**
- page: Número de página (default: 1)
- limit: Elementos por página (default: 10, max: 100)

**Ordenamiento:**
- sortBy: Campo de ordenamiento (createdAt/firstName/lastName/email, default: createdAt)
- order: Orden (asc/desc, default: desc)`,
  security: [{ bearerAuth: [] }],
  request: {
    query: GetUsersQuerySchema,
  },
  responses: {
    200: {
      description:
        "Lista de usuarios obtenida exitosamente con información de paginación",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "success" },
              data: {
                type: "array",
                items: {
                  type: "object",
                  description: "Objeto de usuario (sin contraseña)",
                },
              },
              pagination: {
                type: "object",
                properties: {
                  currentPage: { type: "number", example: 1 },
                  totalPages: { type: "number", example: 3 },
                  totalItems: { type: "number", example: 25 },
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
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/users/{id}",
  tags: ["Users"],
  summary: "Obtener usuario por ID",
  description: "Obtiene los detalles de un usuario específico (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: UserIdSchema,
  },
  responses: {
    200: { description: "Usuario obtenido exitosamente" },
    400: { description: "ID inválido" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Usuario no encontrado" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/users",
  tags: ["Users"],
  summary: "Crear usuario",
  description:
    "Crea un nuevo usuario directamente desde el panel admin (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserBodySchema,
        },
      },
    },
  },
  responses: {
    201: { description: "Usuario creado exitosamente" },
    400: { description: "Datos inválidos" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    409: { description: "El email ya está registrado" },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/v1/users/{id}",
  tags: ["Users"],
  summary: "Actualizar usuario",
  description:
    "Actualiza los datos de un usuario existente (solo admin). No permite cambiar la contraseña desde este endpoint.",
  security: [{ bearerAuth: [] }],
  request: {
    params: UserIdSchema,
    body: {
      content: {
        "application/json": {
          schema: UserBodySchema.omit({ password: true }).partial(),
        },
      },
    },
  },
  responses: {
    200: { description: "Usuario actualizado exitosamente" },
    400: { description: "Datos inválidos" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Usuario no encontrado" },
    409: { description: "El email ya está en uso" },
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/v1/users/{id}/password",
  tags: ["Users"],
  summary: "Cambiar contraseña",
  description:
    "Permite al usuario autenticado cambiar su propia contraseña verificando la contraseña actual",
  security: [{ bearerAuth: [] }],
  request: {
    params: UserIdSchema,
    body: {
      content: {
        "application/json": {
          schema: ChangePasswordBodySchema,
        },
      },
    },
  },
  responses: {
    200: { description: "Contraseña actualizada exitosamente" },
    400: { description: "La contraseña actual es incorrecta" },
    401: { description: "No autenticado" },
    404: { description: "Usuario no encontrado" },
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/v1/users/{id}/deactivate",
  tags: ["Users"],
  summary: "Desactivar usuario",
  description:
    "Desactiva un usuario sin eliminarlo de la base de datos (soft delete, solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: UserIdSchema,
  },
  responses: {
    200: { description: "Usuario desactivado exitosamente" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
    404: { description: "Usuario no encontrado" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/v1/users/{id}",
  tags: ["Users"],
  summary: "Eliminar usuario",
  description:
    "Elimina permanentemente un usuario de la base de datos (solo admin)",
  security: [{ bearerAuth: [] }],
  request: {
    params: UserIdSchema,
  },
  responses: {
    200: { description: "Usuario eliminado exitosamente" },
    400: { description: "ID inválido" },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
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
  summary: "Listar solicitudes de adopción con filtros y paginación (Admin)",
  description: `Obtiene la lista de solicitudes de adopción con múltiples opciones de filtrado y paginación.

**Filtros disponibles:**
- status: Estado de la solicitud (pending/approved/rejected/cancelled)
- petId: ID de la mascota
- userId: ID del usuario solicitante
- reviewedBy: ID del admin que revisó la solicitud
- fromDate: Fecha de creación desde (ISO 8601)
- toDate: Fecha de creación hasta (ISO 8601)

**Paginación:**
- page: Número de página (default: 1)
- limit: Elementos por página (default: 10, max: 100)

**Ordenamiento:**
- sortBy: Campo de ordenamiento (createdAt/reviewedAt/status, default: createdAt)
- order: Orden (asc/desc, default: desc)`,
  security: [{ bearerAuth: [] }],
  request: {
    query: GetAdoptionRequestsQuerySchema,
  },
  responses: {
    200: {
      description:
        "Lista de solicitudes obtenida exitosamente con información de paginación",
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
                  properties: {
                    _id: {
                      type: "string",
                      example: "64f1a2b3c4d5e6f7a8b9c0d1",
                    },
                    petId: {
                      type: "object",
                      properties: {
                        _id: { type: "string" },
                        name: { type: "string", example: "Firulais" },
                        type: { type: "string", example: "perro" },
                        breed: { type: "string", example: "mestizo" },
                        images: { type: "array", items: { type: "object" } },
                      },
                    },
                    userId: {
                      type: "object",
                      properties: {
                        _id: { type: "string" },
                        name: { type: "string", example: "Juan Pérez" },
                        email: { type: "string", example: "juan@email.com" },
                      },
                    },
                    status: { type: "string", example: "pending" },
                    message: {
                      type: "string",
                      example: "Me gustaría adoptar esta mascota",
                    },
                    adminNotes: {
                      type: "string",
                      example: "Solicitud aprobada",
                    },
                    reviewedBy: {
                      type: "object",
                      properties: {
                        _id: { type: "string" },
                        name: { type: "string", example: "Admin" },
                        email: { type: "string", example: "admin@email.com" },
                      },
                    },
                    reviewedAt: { type: "string", format: "date-time" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                  },
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

registry.registerPath({
  method: "get",
  path: "/api/v1/adoptions/stats/monthly",
  tags: ["Adoptions"],
  summary: "Estadísticas mensuales de adopciones (Admin)",
  description: `Obtiene las estadísticas de solicitudes de adopción agrupadas por mes para un año específico.

**Query params:**
- year: Año a consultar (default: año actual)`,
  security: [{ bearerAuth: [] }],
  request: {
    query: MonthlyStatsQuerySchema,
  },
  responses: {
    200: {
      description: "Estadísticas mensuales obtenidas exitosamente",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "success" },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    month: { type: "number", example: 1 },
                    total: { type: "number", example: 5 },
                    approved: { type: "number", example: 3 },
                    pending: { type: "number", example: 1 },
                    rejected: { type: "number", example: 1 },
                    cancelled: { type: "number", example: 0 },
                  },
                },
              },
            },
          },
        },
      },
    },
    401: { description: "No autenticado" },
    403: { description: "No autorizado (requiere rol admin)" },
  },
});
