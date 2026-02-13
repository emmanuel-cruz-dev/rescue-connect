# 🐾 Rescue Connect - Frontend

Aplicación web frontend para la plataforma de adopción de mascotas Rescue Connect, desarrollada con Angular 21.

> **Nota**: Este es el frontend de Rescue Connect. El proyecto completo es un monorepo que incluye tanto el frontend como el [backend](../backend). Para instrucciones generales del proyecto, consulta el [README principal](../README.md).

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Tecnologías](#-tecnologías)
- [Características Implementadas](#-características-implementadas)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración](#-configuración)
- [Desarrollo](#-desarrollo)

---

## 🎯 Descripción General

Rescue Connect Frontend es una aplicación web moderna construida con Angular 21 que proporciona una interfaz intuitiva y atractiva para:

- **Explorar mascotas** disponibles para adopción
- **Autenticación de usuarios** con registro e inicio de sesión
- **Visualizar detalles** completos de cada mascota
- **Interfaz responsiva** que funciona en dispositivos móviles y de escritorio

---

## 🛠 Tecnologías

### Core

- **Angular 21** - Framework principal
- **TypeScript 5.9** - Lenguaje de programación
- **RxJS 7.8** - Programación reactiva

### UI/UX

- **PrimeNG 21** - Biblioteca de componentes UI
- **Tailwind CSS 4.1** - Framework de estilos utility-first
- **Lucide Angular** - Iconos modernos
- **PrimeIcons** - Iconos adicionales de PrimeNG

### Herramientas de Desarrollo

- **Angular CLI 21** - Herramientas de línea de comandos
- **Vitest 4** - Framework de testing
- **Prettier** - Formateo de código

---

## ✨ Características Implementadas

### 🏠 Página de Inicio (Landing)

- **Hero Section**: Presentación principal con llamado a la acción
- **Featured Pets**: Sección de mascotas destacadas
- **How It Works**: Explicación del proceso de adopción
- **Testimonials**: Testimonios de usuarios
- **FAQ**: Preguntas frecuentes

### 🔐 Autenticación

- **Login**: Inicio de sesión de usuarios
- **Register**: Registro de nuevos usuarios
- **Guest Guard**: Protección de rutas para usuarios no autenticados
- **Auth Layout**: Layout específico para páginas de autenticación

### 🐕 Gestión de Mascotas

- **Pet List**: Listado de mascotas disponibles
- **Pet Detail**: Vista detallada de cada mascota
- **Pet Card**: Componente reutilizable para mostrar mascotas
- **Pet Gallery**: Galería de imágenes de mascotas

### 🏗 Arquitectura

- **Layouts**:
  - `MainLayout`: Layout principal de la aplicación
  - `AuthLayout`: Layout para páginas de autenticación
- **Guards**: Protección de rutas
- **Interceptors**: Manejo de peticiones HTTP
- **Services**: Servicios para comunicación con el backend
- **Models**: Interfaces y tipos TypeScript

---

## 📦 Instalación

### Requisitos Previos

- Node.js >= 16.x
- pnpm >= 8.x (recomendado) o npm

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/emmanuel-cruz-dev/rescue-connect.git
cd rescue-connect/frontend
```

2. **Instalar dependencias**
```bash
pnpm install
# o
npm install
```

3. **Configurar variables de entorno** (si es necesario)
```bash
# Editar src/environments/environment.ts con la URL del backend
```

4. **Iniciar el servidor de desarrollo**
```bash
pnpm start
# o
npm start
```

---

## 🚀 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
pnpm start
# La aplicación estará disponible en http://localhost:4200/

# Compilar para producción
pnpm build

# Compilar en modo watch (desarrollo)
pnpm watch

# Ejecutar tests
pnpm test

# Generar componente
ng generate component component-name

# Generar servicio
ng generate service service-name
```

---

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                    # Funcionalidades core
│   │   │   ├── guards/              # Guards de rutas
│   │   │   ├── interceptors/        # Interceptors HTTP
│   │   │   ├── models/              # Interfaces y tipos
│   │   │   ├── services/            # Servicios globales
│   │   │   └── enums/               # Enumeraciones
│   │   │
│   │   ├── features/                # Módulos de funcionalidades
│   │   │   ├── auth/                # Autenticación
│   │   │   │   ├── pages/
│   │   │   │   │   ├── login/
│   │   │   │   │   └── register/
│   │   │   │   └── auth.routes.ts
│   │   │   │
│   │   │   ├── home/                # Página de inicio
│   │   │   │   ├── components/
│   │   │   │   │   ├── hero-section/
│   │   │   │   │   ├── featured-pets/
│   │   │   │   │   ├── how-it-works/
│   │   │   │   │   ├── testimonials/
│   │   │   │   │   ├── faq/
│   │   │   │   │   └── section-header/
│   │   │   │   ├── pages/
│   │   │   │   │   └── landing/
│   │   │   │   └── home.routes.ts
│   │   │   │
│   │   │   ├── pets/                # Gestión de mascotas
│   │   │   │   ├── components/
│   │   │   │   │   ├── pet-card/
│   │   │   │   │   └── pet-gallery/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── pet-list/
│   │   │   │   │   └── pet-detail/
│   │   │   │   └── services/
│   │   │   │       └── pet.service.ts
│   │   │   │
│   │   │   ├── profile/             # Perfil de usuario
│   │   │   ├── admin/               # Panel administrativo
│   │   │   └── errors/              # Páginas de error
│   │   │
│   │   ├── layouts/                 # Layouts de la aplicación
│   │   │   ├── main-layout/         # Layout principal
│   │   │   └── auth-layout/         # Layout de autenticación
│   │   │
│   │   ├── shared/                  # Componentes compartidos
│   │   │
│   │   ├── app.ts                   # Componente raíz
│   │   ├── app.routes.ts            # Configuración de rutas
│   │   └── app.config.ts            # Configuración de la app
│   │
│   ├── assets/                      # Recursos estáticos
│   ├── environments/                # Variables de entorno
│   ├── index.html                   # HTML principal
│   ├── main.ts                      # Punto de entrada
│   └── styles.css                   # Estilos globales
│
├── angular.json                     # Configuración de Angular
├── package.json                     # Dependencias
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Este archivo
```

---

## ⚙️ Configuración

### Variables de Entorno

Editar `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'
};
```

Para producción, editar `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://rescue-connect-kkfo.onrender.com/api/v1'
};
```

---

## 💻 Desarrollo

### Servidor de Desarrollo

```bash
pnpm start
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques archivos.

### Generar Componentes

Angular CLI incluye herramientas de scaffolding. Para generar un nuevo componente:

```bash
ng generate component features/nombre-feature/components/nombre-componente
```

Para ver la lista completa de schematics disponibles:

```bash
ng generate --help
```

### Build de Producción

```bash
pnpm build
```

Los artefactos de compilación se almacenarán en el directorio `dist/`. Por defecto, el build de producción optimiza la aplicación para rendimiento y velocidad.

### Testing

Para ejecutar tests unitarios con [Vitest](https://vitest.dev/):

```bash
pnpm test
```

---

## 🔗 Enlaces Relacionados

- **[Backend API](../backend/README.md)**: Documentación del backend
- **[README Principal](../README.md)**: Documentación general del proyecto
- **[Angular CLI](https://angular.dev/tools/cli)**: Documentación de Angular CLI
- **[PrimeNG](https://primeng.org/)**: Documentación de PrimeNG
- **[Tailwind CSS](https://tailwindcss.com/)**: Documentación de Tailwind CSS

---

## 📝 Notas

- El proyecto utiliza **standalone components** de Angular
- Se implementa **lazy loading** para optimizar la carga inicial
- Los estilos siguen la metodología **utility-first** de Tailwind CSS
- Se utiliza **PrimeNG** para componentes UI complejos

---

<div align="center">
  <p>Desarrollado con Angular 21 y ❤️</p>
</div>
