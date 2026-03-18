# 🐾 Rescue Connect

**Plataforma web para la adopción responsable de mascotas**

<div align="center">
  
![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)
![Backend](https://img.shields.io/badge/Backend-Completo-green)
![Frontend](https://img.shields.io/badge/Frontend-En%20Construcción-orange)

</div>

> ⚠️ **Proyecto en Desarrollo Activo**: El backend está funcional y desplegado. El frontend está actualmente en construcción y se están implementando nuevas funcionalidades

Rescue Connect es una aplicación full-stack que conecta a mascotas en busca de hogar con personas dispuestas a adoptarlas. El proyecto facilita el proceso de adopción mediante un sistema de solicitudes, gestión de perfiles de mascotas y autenticación segura de usuarios.

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Estado del Proyecto](#-estado-del-proyecto)
- [Inicio Rápido](#-inicio-rápido)
- [Documentación](#-documentación)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características Principales

### 🔐 Autenticación y Autorización
- Registro e inicio de sesión de usuarios
- Autenticación basada en JWT
- Control de acceso por roles (usuario/administrador)
- Gestión de perfil de usuario

### 🐕 Gestión de Mascotas
- Catálogo de mascotas disponibles para adopción
- Información detallada de cada mascota (nombre, edad, raza, descripción)
- Galería de imágenes múltiples por mascota
- Filtrado de mascotas por estado de adopción

### 📝 Sistema de Adopción
- Solicitudes de adopción por parte de usuarios autenticados
- Estados de solicitud: pendiente, aprobada, rechazada, cancelada
- Panel administrativo para gestionar solicitudes
- Notas administrativas en el proceso de revisión

### 📸 Gestión de Imágenes
- Subida múltiple de imágenes (hasta 5 por mascota)
- Almacenamiento en la nube con Cloudinary
- Optimización automática de imágenes

### 🎨 Interfaz de Usuario Moderna
- Diseño responsivo y atractivo
- Componentes reutilizables con PrimeNG
- Experiencia de usuario fluida
- Páginas de landing, autenticación y catálogo de mascotas

---

## 🛠 Stack Tecnológico

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.x
- **Lenguaje**: TypeScript
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (jsonwebtoken)
- **Seguridad**: bcryptjs para hash de contraseñas
- **Validación**: Zod
- **Almacenamiento**: Cloudinary
- **Documentación**: Swagger UI

### Frontend
- **Framework**: Angular 21
- **Lenguaje**: TypeScript
- **UI Components**: PrimeNG
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide Angular
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router

---

## 📁 Estructura del Proyecto

Este es un **monorepo** que contiene tanto el backend como el frontend:

```
rescue-connect/
├── backend/              # API REST con Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/  # Lógica de control
│   │   ├── models/       # Modelos de negocio
│   │   ├── routes/       # Definición de rutas
│   │   ├── schemas/      # Esquemas de Mongoose
│   │   ├── services/     # Servicios externos
│   │   ├── middlewares/  # Middlewares
│   │   └── validators/   # Validadores Zod
│   └── README.md         # Documentación del backend
│
├── frontend/             # Aplicación Angular
│   ├── src/
│   │   └── app/
│   │       ├── core/     # Servicios, guards, interceptors
│   │       ├── features/ # Módulos de funcionalidades
│   │       ├── layouts/  # Layouts de la aplicación
│   │       └── shared/   # Componentes compartidos
│   └── README.md         # Documentación del frontend
│
└── README.md             # Este archivo
```

---

## 🚧 Estado del Proyecto

### Backend ✅
- **Estado**: Funcional y desplegado
- **API REST**: Completamente operativa
- **Documentación**: Swagger disponible
- **Próximas mejoras**: Detalles menores y optimizaciones

### Frontend 🔨
- **Estado**: En desarrollo activo
- **Completado**: 
  - ✅ Página de inicio (Landing)
  - ✅ Sistema de autenticación (Login/Registro)
  - ✅ Listado de mascotas
  - ✅ Vista detallada de mascotas
  - ✅ Layouts y guards
- **En progreso**:
  - 🔄 Panel de usuario
  - 🔄 Sistema de solicitudes de adopción
  - 🔄 Panel administrativo
  - 🔄 Gestión de perfil

---

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** >= 16.x
- **MongoDB** >= 5.x (local o MongoDB Atlas)
- **pnpm** >= 8.x (recomendado) o npm

### 1. Clonar el Repositorio

```bash
git clone https://github.com/emmanuel-cruz-dev/rescue-connect.git
cd rescue-connect
```

### 2. Configurar y Ejecutar el Backend

```bash
cd backend

# Instalar dependencias
pnpm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env con tus credenciales (MongoDB, JWT, Cloudinary)

# Iniciar servidor de desarrollo
pnpm dev
```

El backend estará disponible en `http://localhost:3000`

**Documentación Swagger**: `http://localhost:3000/api-docs`

### 3. Configurar y Ejecutar el Frontend

```bash
cd frontend

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm start
```

El frontend estará disponible en `http://localhost:4200`

---

## 📚 Documentación

Para información detallada sobre cada parte del proyecto:

- **[📖 Documentación del Backend](./backend/README.md)**: API endpoints, modelos de datos, arquitectura, configuración y más
- **[📖 Documentación del Frontend](./frontend/README.md)**: Estructura del proyecto, componentes, servicios, guards y configuración

### Deploys

- **Backend**: [https://rescue-connect-kkfo.onrender.com](https://rescue-connect-kkfo.onrender.com)
- **Frontend**: [https://rescue-connect-rs.vercel.app](https://rescue-connect-rs.vercel.app)
- **Swagger Docs**: [https://rescue-connect-kkfo.onrender.com/api/v1/docs](https://rescue-connect-kkfo.onrender.com/api/v1/docs)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 👨‍💻 Autor

**Emmanuel Cruz**

- GitHub: [@emmanuel-cruz-dev](https://github.com/emmanuel-cruz-dev)
- Proyecto: [Rescue Connect](https://github.com/emmanuel-cruz-dev/rescue-connect)
