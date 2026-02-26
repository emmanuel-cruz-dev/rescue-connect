# 🐾 Rescue Connect - Backend API

<div align="center">

![Status](https://img.shields.io/badge/Status-Production_Ready-green)
![Node.js](https://img.shields.io/badge/Node.js-16+-brightgreen?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/API_Docs-Swagger-85EA2D?logo=swagger)

</div>


API REST desarrollada con Node.js, Express, TypeScript y MongoDB para la gestión de adopción de mascotas.

> **Nota**: Este es el backend de Rescue Connect. El proyecto completo es un monorepo que incluye tanto el [frontend](../frontend) como el backend. Para instrucciones generales del proyecto, consulta el [README principal](../README.md).
> 
## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Características Principales](#-características-principales)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Modelos de Datos](#-modelos-de-datos)
- [Middlewares](#-middlewares)
- [Servicios](#-servicios)
- [Validación](#-validación)
- [Manejo de Errores](#-manejo-de-errores)
- [Documentación API](#-documentación-api)

## 🎯 Descripción General

Rescue Connect Backend es una API RESTful que permite gestionar el proceso de adopción de mascotas. Proporciona funcionalidades completas para:

- **Autenticación y autorización** de usuarios con JWT
- **Gestión de mascotas** (CRUD completo)
- **Sistema de adopción** de mascotas
- **Gestión de imágenes** con Cloudinary
- **Perfiles de usuario** con información de contacto
- **Administración de usuarios** (CRUD completo para admins)
- **Control de acceso basado en roles** (admin/user)

## 🛠 Tecnologías

### Core

- **Node.js** - Entorno de ejecución
- **Express 5.x** - Framework web
- **TypeScript** - Tipado estático
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### Autenticación y Seguridad

- **jsonwebtoken** - Generación y verificación de tokens JWT
- **bcryptjs** - Hash de contraseñas

### Validación

- **Zod** - Validación de esquemas con TypeScript
- **@asteasolutions/zod-to-openapi** - Generación de documentación OpenAPI

### Almacenamiento

- **Cloudinary** - Almacenamiento y gestión de imágenes
- **Multer** - Manejo de archivos multipart/form-data

### Documentación

- **Swagger UI Express** - Interfaz de documentación interactiva

### Desarrollo

- **ts-node-dev** - Desarrollo con hot-reload
- **TypeScript** - Compilador y tipos

## 🏗 Arquitectura

El proyecto sigue una **arquitectura en capas** (Layered Architecture) con separación clara de responsabilidades:

```
┌─────────────────────────────────────┐
│         Routes Layer                │  ← Definición de endpoints
├─────────────────────────────────────┤
│      Middlewares Layer              │  ← Validación, autenticación, autorización
├─────────────────────────────────────┤
│      Controllers Layer              │  ← Lógica de control de flujo
├─────────────────────────────────────┤
│        Models Layer                 │  ← Lógica de negocio
├─────────────────────────────────────┤
│       Services Layer                │  ← Servicios externos (Cloudinary)
├─────────────────────────────────────┤
│      Schemas Layer                  │  ← Esquemas de Mongoose
└─────────────────────────────────────┘
```

### Patrón de Diseño

- **Singleton Pattern**: Utilizado en modelos, controladores y servicios
- **Middleware Pattern**: Para procesamiento de requests
- **Repository Pattern**: Modelos actúan como repositorios de datos

## ✨ Características Principales

### 🔐 Sistema de Autenticación

- Registro de usuarios con validación completa
- Login con generación de token JWT
- Protección de rutas mediante middleware de autenticación
- Control de acceso basado en roles (RBAC)
- Cambio de contraseña seguro
- Gestión de perfil de usuario

### 🐕 Gestión de Mascotas

- CRUD completo de mascotas
- Tipos soportados: perro, gato
- Información detallada: nombre, edad, raza, descripción
- Sistema de imágenes múltiples por mascota
- Estado de adopción
- Relación con usuario adoptante

### 📸 Gestión de Imágenes

- Subida múltiple de imágenes (hasta 5 por mascota)
- Optimización automática de imágenes
- Límite de tamaño: 5MB por imagen
- Formatos soportados: JPG, PNG, WEBP
- Eliminación individual de imágenes
- Almacenamiento en Cloudinary

### 👥 Sistema de Solicitudes de Adopción

- Usuarios autenticados pueden crear solicitudes de adopción
- Sistema de estados: pendiente, aprobada, rechazada, cancelada
- Usuarios pueden cancelar sus propias solicitudes pendientes
- Administradores pueden aprobar o rechazar solicitudes
- Aprobación automática marca la mascota como adoptada
- Rechazo automático de otras solicitudes pendientes al aprobar una
- Consulta de solicitudes por usuario o por mascota
- Notas administrativas en revisiones

### 🧑‍💼 Administración de Usuarios

- CRUD completo de usuarios (solo admin)
- Filtros por rol, estado activo y búsqueda por nombre/email
- Paginación y ordenamiento
- Desactivación de usuarios (soft delete)
- Eliminación física (hard delete)
- Cambio de contraseña verificando la contraseña actual

## 📦 Instalación

### Requisitos Previos

- Node.js >= 16.x
- MongoDB >= 5.x
- pnpm >= 8.x (recomendado) o npm

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/emmanuel-cruz-dev/rescue-connect.git
cd rescue-connect/backend
```

2. **Instalar dependencias**
```bash
pnpm install
# o
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

4. **Editar el archivo `.env`** con tus credenciales

5. **Iniciar el servidor de desarrollo**
```bash
pnpm dev
# o
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto backend:

```env
### MongoDB
MONGODB_URI=mongodb://localhost:27017/pets

### JWT
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=1h

### Bcrypt
BCRYPT_ROUNDS=10

### Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### Port
PORT=3000
```

### Configuración de MongoDB

- **Local**: MongoDB debe estar ejecutándose en `localhost:27017`
- **Cloud**: Usar MongoDB Atlas y actualizar `MONGODB_URI`

### Configuración de Cloudinary

1. Crear cuenta en [Cloudinary](https://cloudinary.com/)
2. Obtener credenciales del dashboard
3. Configurar variables de entorno

## 🚀 Scripts Disponibles

```bash
# Desarrollo con hot-reload
pnpm dev

# Compilar TypeScript a JavaScript
pnpm build

# Ejecutar versión compilada
pnpm start

# Ejecutar tests (pendiente implementación)
pnpm test
```

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── app.ts                    # Configuración de Express
│   ├── index.ts                  # Punto de entrada de la aplicación
│   │
│   ├── config/                   # Configuraciones
│   │   ├── cloudinary.config.ts  # Configuración de Cloudinary
│   │   ├── dbClient.config.ts    # Cliente de MongoDB
│   │   └── env.ts                # Variables de entorno
│   │
│   ├── controllers/              # Controladores
│   │   ├── adoption.controller.ts # Controlador de adopciones
│   │   ├── auth.controller.ts    # Controlador de autenticación
│   │   ├── pets.controller.ts    # Controlador de mascotas
│   │   └── users.controller.ts   # Controlador de usuarios
│   │
│   ├── docs/                     # Documentación Swagger
│   │   ├── swagger.ts            # Configuración de Swagger
│   │   └── routes.swagger.ts     # Definición de rutas en Swagger
│   │
│   ├── middlewares/              # Middlewares
│   │   ├── auth.middleware.ts    # Autenticación y autorización
│   │   ├── error.middleware.ts   # Manejo de errores
│   │   ├── upload.middleware.ts  # Configuración de Multer
│   │   └── validate.middleware.ts # Validación con Zod
│   │
│   ├── models/                   # Modelos (lógica de negocio)
│   │   ├── adoption.model.ts     # Modelo de adopciones
│   │   ├── auth.model.ts         # Modelo de autenticación
│   │   ├── pets.model.ts         # Modelo de mascotas
│   │   └── user.model.ts         # Modelo de administración de usuarios
│   │
│   ├── routes/                   # Definición de rutas
│   │   ├── adoption.routes.ts    # Rutas de adopciones
│   │   ├── auth.routes.ts        # Rutas de autenticación
│   │   ├── index.ts              # Router principal
│   │   ├── pets.routes.ts        # Rutas de mascotas
│   │   └── user.routes.ts        # Rutas de usuarios
│   │
│   ├── schemas/                  # Esquemas de Mongoose
│   │   ├── adoption.schema.ts    # Esquema de solicitud de adopción
│   │   ├── auth.schema.ts        # Esquema de usuario (auth)
│   │   ├── pets.schema.ts        # Esquema de mascota
│   │   └── user.schema.ts        # Esquema de usuario (admin)
│   │
│   ├── services/                 # Servicios externos
│   │   └── cloudinary.service.ts # Servicio de Cloudinary
│   │
│   ├── types/                    # Definiciones de tipos
│   │   ├── adoption.types.ts     # Tipos de adopciones
│   │   ├── common.types.ts       # Tipos compartidos
│   │   ├── index.ts              # Re-exports de tipos
│   │   ├── pet.types.ts          # Tipos de mascotas
│   │   └── user.types.ts         # Tipos de usuarios
│   │
│   ├── utils/                    # Utilidades
│   │   └── jwt.utils.ts          # Utilidades JWT
│   │
│   └── validators/               # Validadores Zod
│       ├── adoption.validator.ts # Validadores de adopciones
│       ├── auth.validator.ts     # Validadores de autenticación
│       ├── pet.validator.ts      # Validadores de mascotas
│       └── user.validator.ts     # Validadores de usuarios
│
├── .env                          # Variables de entorno (no versionado)
├── .env.example                  # Ejemplo de variables de entorno
├── .gitignore                    # Archivos ignorados por Git
├── package.json                  # Dependencias y scripts
├── pnpm-lock.yaml                # Lock file de pnpm
├── tsconfig.json                 # Configuración de TypeScript
└── README.md                     # Este archivo
```

## 🌐 API Endpoints

### Base URL

- **Producción**: `https://rescue-connect-kkfo.onrender.com`
- **Desarrollo**: `http://localhost:3000`

### Autenticación (`/api/v1/auth`)

| Método | Endpoint           | Descripción                | Auth | Rol        |
| ------ | ------------------ | -------------------------- | ---- | ---------- |
| POST   | `/register`        | Registrar nuevo usuario    | No   | -          |
| POST   | `/login`           | Iniciar sesión             | No   | -          |
| GET    | `/profile`         | Obtener perfil del usuario | Sí   | user/admin |
| PUT    | `/profile`         | Actualizar perfil          | Sí   | user/admin |
| POST   | `/change-password` | Cambiar contraseña         | Sí   | user/admin |
| POST   | `/logout`          | Cerrar sesión              | Sí   | user/admin |
| GET    | `/my-pets`         | Obtener mascotas adoptadas | Sí   | user/admin |

### Mascotas (`/api/v1/pets`)

| Método | Endpoint                | Descripción                                                    | Auth | Rol   |
| ------ | ----------------------- | -------------------------------------------------------------- | ---- | ----- |
| GET    | `/`                     | Listar todas las mascotas (acepta query `?adopted=true/false`) | No   | -     |
| GET    | `/:id`                  | Obtener mascota por ID                                         | No   | -     |
| POST   | `/`                     | Crear nueva mascota                                            | Sí   | admin |
| PUT    | `/:id`                  | Actualizar mascota                                             | Sí   | admin |
| DELETE | `/:id`                  | Eliminar mascota                                               | Sí   | admin |
| POST   | `/:id/images`           | Subir imágenes                                                 | Sí   | admin |
| DELETE | `/:id/images/:publicId` | Eliminar imagen                                                | Sí   | admin |

### Usuarios (`/api/v1/users`)

| Método | Endpoint              | Descripción                                    | Auth | Rol        |
| ------ | --------------------- | ---------------------------------------------- | ---- | ---------- |
| GET    | `/`                   | Listar usuarios con filtros y paginación       | Sí   | admin      |
| GET    | `/:id`                | Obtener usuario por ID                         | Sí   | admin      |
| POST   | `/`                   | Crear usuario                                  | Sí   | admin      |
| PUT    | `/:id`                | Actualizar usuario (sin contraseña)            | Sí   | admin      |
| PATCH  | `/:id/password`       | Cambiar contraseña (verificando la actual)     | Sí   | user/admin |
| PATCH  | `/:id/deactivate`     | Desactivar usuario (soft delete)               | Sí   | admin      |
| DELETE | `/:id`                | Eliminar usuario permanentemente               | Sí   | admin      |

### Solicitudes de Adopción (`/api/v1/adoptions`)

#### Rutas de Usuario

| Método | Endpoint                      | Descripción                 | Auth | Rol        |
| ------ | ----------------------------- | --------------------------- | ---- | ---------- |
| POST   | `/pets/:petId/request`        | Crear solicitud de adopción | Sí   | user/admin |
| GET    | `/my-requests`                | Obtener mis solicitudes     | Sí   | user/admin |
| PATCH  | `/requests/:requestId/cancel` | Cancelar solicitud propia   | Sí   | user/admin |

#### Rutas de Administrador

| Método | Endpoint                       | Descripción                        | Auth | Rol   |
| ------ | ------------------------------ | ---------------------------------- | ---- | ----- |
| GET    | `/requests`                    | Listar todas las solicitudes       | Sí   | admin |
| GET    | `/requests/:requestId`         | Obtener solicitud por ID           | Sí   | admin |
| GET    | `/pets/:petId/requests`        | Obtener solicitudes de una mascota | Sí   | admin |
| PATCH  | `/requests/:requestId/approve` | Aprobar solicitud                  | Sí   | admin |
| PATCH  | `/requests/:requestId/reject`  | Rechazar solicitud                 | Sí   | admin |

### Ejemplos de Uso

#### Registro de Usuario

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+54 11 1234-5678",
  "address": "Calle Falsa 123, Buenos Aires"
}
```

#### Login

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Respuesta:**

```json
{
  "status": "success",
  "message": "Login exitoso",
  "data": {
    "user": {
      "_id": "...",
      "email": "usuario@ejemplo.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "+54 11 1234-5678",
      "address": "Calle Falsa 123, Buenos Aires",
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

#### Crear Mascota (Admin)

```bash
POST /api/v1/pets
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Max",
  "type": "perro",
  "age": 3,
  "breed": "Golden Retriever",
  "description": "Perro muy cariñoso y juguetón"
}
```

#### Listar Mascotas con Filtro

```bash
# Obtener todas las mascotas
GET /api/v1/pets

# Obtener solo mascotas adoptadas
GET /api/v1/pets?adopted=true

# Obtener solo mascotas disponibles (no adoptadas)
GET /api/v1/pets?adopted=false
```

#### Subir Imágenes de Mascota (Admin)

```bash
POST /api/v1/pets/:id/images
Authorization: Bearer <token>
Content-Type: multipart/form-data

images: [archivo1.jpg, archivo2.jpg]
```

#### Listar Usuarios con Filtros (Admin)

```bash
# Listar todos los usuarios
GET /api/v1/users
Authorization: Bearer <token>

# Filtrar por rol
GET /api/v1/users?role=admin

# Filtrar usuarios inactivos
GET /api/v1/users?isActive=false

# Buscar por nombre o email
GET /api/v1/users?search=juan

# Paginación y ordenamiento
GET /api/v1/users?page=2&limit=20&sortBy=createdAt&order=asc
```

#### Crear Usuario (Admin)

```bash
POST /api/v1/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "nuevo@ejemplo.com",
  "password": "password123",
  "firstName": "María",
  "lastName": "González",
  "phone": "+54 11 9876-5432",
  "address": "Av. Corrientes 1234, Buenos Aires",
  "role": "user"
}
```

#### Cambiar Contraseña de Usuario

```bash
PATCH /api/v1/users/:id/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "nuevaPassword456"
}
```

#### Desactivar Usuario (Admin)

```bash
PATCH /api/v1/users/:id/deactivate
Authorization: Bearer <token>
```

#### Crear Solicitud de Adopción

```bash
POST /api/v1/adoptions/pets/:petId/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Me encantaría adoptar a esta mascota. Tengo experiencia con perros y un jardín amplio."
}
```

#### Obtener Mis Solicitudes de Adopción

```bash
GET /api/v1/adoptions/my-requests
Authorization: Bearer <token>

# Filtrar por estado
GET /api/v1/adoptions/my-requests?status=pending
```

#### Cancelar Solicitud (Usuario)

```bash
PATCH /api/v1/adoptions/requests/:requestId/cancel
Authorization: Bearer <token>
```

#### Aprobar Solicitud (Admin)

```bash
PATCH /api/v1/adoptions/requests/:requestId/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "adminNotes": "Solicitante verificado. Excelentes referencias."
}
```

#### Rechazar Solicitud (Admin)

```bash
PATCH /api/v1/adoptions/requests/:requestId/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "adminNotes": "No cumple con los requisitos de espacio."
}
```

## 📊 Modelos de Datos

### Usuario (User)

```typescript
interface IUser {
  firstName: string; // Nombre (2-50 caracteres)
  lastName: string; // Apellido (2-50 caracteres)
  email: string; // Email único (validado)
  password: string; // Contraseña hasheada (8-100 caracteres)
  phone: string; // Teléfono (8-50 caracteres)
  address: string; // Dirección (2-200 caracteres)
  role: "admin" | "user"; // Rol del usuario (default: "user")
  isActive: boolean; // Estado de la cuenta (default: true)
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de actualización
}
```

**Validaciones:**

- Nombre y apellido: solo letras (incluye acentos y ñ)
- Email: formato válido y único
- Password: mínimo 8 caracteres, hasheada con bcrypt
- Phone: formato de número telefónico válido

**Métodos:**

- `comparePassword(password: string)`: Compara contraseña con hash
- `toJSON()`: Elimina password del objeto al serializar

**Índices:**

- Email (único)

### Mascota (Pet)

```typescript
interface IPet {
  name: string; // Nombre (3-50 caracteres)
  type: "perro" | "gato"; // Tipo de mascota
  birthDate: Date; // Fecha de nacimiento
  gender: "macho" | "hembra"; // Género
  size: "pequeño" | "mediano" | "grande" | "extra grande"; // Tamaño
  breed: string; // Raza
  description?: string; // Descripción (max 500 caracteres)
  images?: IPetImage[]; // Array de imágenes
  isSterilized: boolean; // Si está esterilizada (default: false)
  isVaccinated: boolean; // Si está vacunada (default: false)
  adopted: boolean; // Estado de adopción (default: false)
  adoptedBy?: ObjectId; // ID del usuario adoptante
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de actualización
}

interface IPetImage {
  url: string; // URL de Cloudinary
  publicId: string; // ID público de Cloudinary
}
```

**Índices:**

- `adoptedBy`: Para búsquedas por usuario
- `adopted`, `type`, `gender`, `size`: Para filtros combinados
- `createdAt`, `birthDate`: Para ordenamiento

### Solicitud de Adopción (AdoptionRequest)

```typescript
interface IAdoptionRequest {
  petId: ObjectId; // ID de la mascota
  userId: ObjectId; // ID del usuario solicitante
  status: "pending" | "approved" | "rejected" | "cancelled"; // Estado
  message?: string; // Mensaje del solicitante (max 500 caracteres)
  adminNotes?: string; // Notas del administrador (max 500 caracteres)
  reviewedBy?: ObjectId; // ID del admin que revisó
  reviewedAt?: Date; // Fecha de revisión
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de actualización
}
```

**Estados:**

- `pending`: Solicitud creada, esperando revisión
- `approved`: Solicitud aprobada por admin (mascota adoptada)
- `rejected`: Solicitud rechazada por admin
- `cancelled`: Solicitud cancelada por el usuario

**Validaciones:**

- No se pueden crear solicitudes duplicadas pendientes para la misma mascota
- Solo se pueden cancelar solicitudes en estado `pending`
- Solo se pueden aprobar/rechazar solicitudes en estado `pending`
- Al aprobar una solicitud, se rechazan automáticamente las demás pendientes

**Índices:**

- `petId`: Para búsquedas por mascota
- `userId`: Para búsquedas por usuario
- `status`: Para filtrar por estado
- Índice compuesto `[petId, userId, status]`: Para validar duplicados

## 🔒 Middlewares

### 1. Authentication Middleware (`authenticate`)

**Ubicación:** `src/middlewares/auth.middleware.ts`

**Función:** Verifica que el usuario esté autenticado mediante token JWT.

**Proceso:**

1. Extrae el token del header `Authorization: Bearer <token>`
2. Verifica la validez del token con JWT
3. Decodifica el payload y lo agrega a `req.user`
4. Permite continuar si es válido, retorna 401 si no

**Uso:**

```typescript
router.get("/profile", authenticate, controller.getProfile);
```

### 2. Authorization Middleware (`authorize`)

**Ubicación:** `src/middlewares/auth.middleware.ts`

**Función:** Verifica que el usuario tenga el rol necesario.

**Proceso:**

1. Verifica que `req.user` exista (debe usarse después de `authenticate`)
2. Comprueba si el rol del usuario está en la lista de roles permitidos
3. Permite continuar si tiene permisos, retorna 403 si no

**Uso:**

```typescript
router.post("/pets", authenticate, authorize("admin"), controller.create);
```

### 3. Validation Middleware (`validate`)

**Ubicación:** `src/middlewares/validate.middleware.ts`

**Función:** Valida los datos de entrada usando esquemas Zod.

**Proceso:**

1. Recibe un esquema Zod
2. Valida `body`, `params` y `query` del request
3. Retorna errores detallados si la validación falla
4. Permite continuar si los datos son válidos

**Uso:**

```typescript
router.post("/register", validate(registerSchema), controller.register);
```

### 4. Upload Middleware (`upload`)

**Ubicación:** `src/middlewares/upload.middleware.ts`

**Función:** Configura Multer para manejo de archivos.

**Configuración:**

- **Storage:** Memoria (buffer)
- **Formatos permitidos:** JPG, JPEG, PNG, WEBP
- **Tamaño máximo:** 5MB por archivo
- **Cantidad máxima:** 5 archivos

**Uso:**

```typescript
router.post("/:id/images", upload.array("images", 5), controller.uploadImages);
```

### 5. Error Handler Middleware (`errorHandler`)

**Ubicación:** `src/middlewares/error.middleware.ts`

**Función:** Maneja todos los errores de la aplicación de forma centralizada.

**Errores Manejados:**

- Errores de validación de Mongoose
- Errores de cast (ID inválido)
- Duplicados de MongoDB (código 11000)
- Errores de negocio personalizados
- Errores de Multer (tamaño de archivo)
- Error genérico 500

## 🔧 Servicios

### Cloudinary Service

**Ubicación:** `src/services/cloudinary.service.ts`

**Métodos:**

#### `uploadImage(file, folder?)`

Sube una imagen a Cloudinary con optimización automática.

**Parámetros:**

- `file`: Archivo de Multer
- `folder`: Carpeta en Cloudinary (default: "rescue-connect/pets")

**Transformaciones aplicadas:**

- Límite de dimensiones: 800x800px
- Calidad: automática
- Formato: automático (WebP cuando sea posible)

**Retorna:**

```typescript
{
  url: string; // URL segura de la imagen
  publicId: string; // ID público para eliminación
}
```

#### `uploadMultipleImages(files, folder?)`

Sube múltiples imágenes en paralelo.

#### `deleteImage(publicId)`

Elimina una imagen de Cloudinary.

#### `deleteMultipleImages(publicIds)`

Elimina múltiples imágenes en paralelo.

## ✅ Validación

El sistema utiliza **Zod** para validación de datos con tipado estático.

### Validadores de Autenticación (`src/validators/auth.validator.ts`)

- `registerSchema`: email, password, firstName, lastName, phone, address
- `loginSchema`: email, password
- `changePasswordSchema`: currentPassword, newPassword

### Validadores de Mascotas (`src/validators/pet.validator.ts`)

- `createPetSchema`: name, type, birthDate, gender, size, breed, description, isSterilized, isVaccinated
- `updatePetSchema`: todos los campos opcionales
- `petIdSchema`: id (formato MongoDB ObjectId)
- `getPetsSchema`: filtros, paginación y ordenamiento via query params

### Validadores de Usuarios (`src/validators/user.validator.ts`)

- `createUserSchema`: firstName, lastName, email, password, phone, address, role, isActive
- `updateUserSchema`: todos los campos excepto password, todos opcionales
- `updatePasswordSchema`: currentPassword, newPassword
- `userIdSchema`: id (formato MongoDB ObjectId)
- `getUsersSchema`: filtros (role, isActive, search), paginación y ordenamiento via query params

### Validadores de Adopciones (`src/validators/adoption.validator.ts`)

- `createAdoptionRequestSchema`: message (opcional)
- `reviewAdoptionRequestSchema`: adminNotes (opcional)
- `adoptionStatusQuerySchema`: status, paginación

## ⚠️ Manejo de Errores

### Tipos de Errores

1. **Errores de Validación (400)** - Datos de entrada inválidos
2. **Errores de Autenticación (401)** - Token no proporcionado, inválido o expirado
3. **Errores de Autorización (403)** - Permisos insuficientes o cuenta desactivada
4. **Errores de Recursos (404)** - Usuario, mascota o imagen no encontrada
5. **Errores de Conflicto (409)** - Email ya registrado o duplicado
6. **Errores del Servidor (500)** - Error interno no manejado

### Formato de Respuesta de Error

```json
{
  "status": "error",
  "message": "Descripción del error",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

## 📖 Documentación API

### Swagger UI

La documentación interactiva está disponible en:

- **Desarrollo:** http://localhost:3000/api/v1/docs
- **Producción:** https://rescue-connect-kkfo.onrender.com/api/v1/docs

### Uso de Swagger

1. Acceder a `/api/v1/docs`
2. Para endpoints protegidos:
   - Click en "Authorize"
   - Ingresar: `Bearer <tu-token>`
   - Click en "Authorize"
3. Seleccionar endpoint y probar

## 🔐 Seguridad

### Medidas Implementadas

1. **Contraseñas:** Hash con bcrypt, nunca se devuelven en responses
2. **JWT:** Secret y expiración configurables, verificación en cada request protegido
3. **Validación:** Validación estricta de entrada con Zod, sanitización de datos
4. **MongoDB:** Validación a nivel de esquema, índices únicos, Mongoose para prevenir inyección NoSQL
5. **Archivos:** Validación de tipo MIME, límite de tamaño y cantidad

## 🚀 Despliegue

### Producción

La aplicación está desplegada en **Render**: https://rescue-connect-kkfo.onrender.com

### Variables de Entorno en Producción

Configurar en el panel de Render: `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `BCRYPT_ROUNDS`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `PORT`

### Build & Start

```bash
pnpm install && pnpm build   # Build
pnpm start                   # Start
```

## 📝 Notas Adicionales

### Características Pendientes

- [ ] Implementación de tests unitarios e integración
- [ ] Sistema de refresh tokens
- [ ] Sistema de notificaciones
- [ ] Rate limiting
- [ ] Logs estructurados

### Mejoras Futuras

- Sistema de comentarios/reviews
- Notificaciones por email

## 👨‍💻 Desarrollo

### Convenciones de Código

- **Idioma:** Español para mensajes de usuario, inglés para código
- **Formato:** Prettier (configuración por defecto)
- **Commits:** Mensajes descriptivos en español

### Contribuir

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

ISC
