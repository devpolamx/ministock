# MiniStock - Sistema de Gestión de Inventario

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue.svg" alt="React 19">
  <img src="https://img.shields.io/badge/Laravel-12.44-red.svg" alt="Laravel 12.44">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/PHP-8.2+-purple.svg" alt="PHP 8.2+">
  <img src="https://img.shields.io/badge/SQLite-3.0+-orange.svg" alt="SQLite">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License">
</p>

## 📋 Descripción

MiniStock es un **sistema completo de gestión de inventario** desarrollado con una arquitectura moderna de frontend y backend separados. Permite a las empresas gestionar eficientemente sus productos, categorías y usuarios con una interfaz intuitiva y una API robusta.

### 🎯 Características Principales

- **🏪 Gestión de Productos**: CRUD completo de productos con información detallada (nombre, descripción, precio, stock)
- **📂 Categorización**: Organización jerárquica de productos por categorías
- **👥 Control de Usuarios**: Sistema de autenticación con roles (admin/usuario)
- **🌙 Interfaz Moderna**: UI responsiva con modo oscuro nativo
- **📊 Tablas Avanzadas**: Filtrado, ordenamiento y paginación en tiempo real
- **🔐 API RESTful**: Backend seguro con autenticación JWT-like
- **📱 Diseño Responsivo**: Funciona perfectamente en desktop y móvil

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura de microservicios** con frontend y backend separados:

```
ministock/
├── frontend/          # Aplicación React/TypeScript
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── hooks/         # Lógica de negocio
│   │   ├── services/      # Cliente API
│   │   ├── store/         # Estado global (Redux)
│   │   └── types/         # Definiciones TypeScript
│   └── README.md          # Documentación frontend
├── api/               # API Laravel/PHP
│   ├── app/
│   │   ├── Http/Controllers/Api/V1/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Policies/
│   ├── database/migrations/
│   └── README.md           # Documentación API
└── README.md          # Este archivo
```

## 🚀 Tecnologías Utilizadas

### Frontend ([Ver documentación completa](./frontend/README.md))
- **React 19** - Framework UI moderno con concurrent features
- **TypeScript** - Tipado estático para desarrollo robusto
- **Vite** - Build tool ultrarrápido con HMR
- **Bootstrap 5.3** - Framework CSS con modo oscuro nativo
- **TanStack Table** - Componente de tablas avanzado
- **Redux Toolkit** - Gestión de estado global
- **React Router** - Enrutamiento del lado cliente
- **Axios** - Cliente HTTP para API
- **Lucide React** - Iconos modernos y consistentes

### Backend ([Ver documentación completa](./api/README.md))
- **Laravel 12.44** - Framework PHP moderno y robusto
- **PHP 8.2+** - Lenguaje con últimas características
- **SQLite 3.0+** - Base de datos embebida ligera
- **Laravel Sanctum** - Autenticación API stateless
- **Composer** - Gestor de dependencias PHP
- **PHPUnit** - Framework de testing

## 🛠️ Instalación y Configuración

### Prerrequisitos

- **Node.js 18+** y **npm**
- **PHP 8.2+** y **Composer**
- **SQLite 3.0+** (viene incluido con PHP)

### 🚀 Inicio Rápido

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/devpolamx/ministock.git
   cd ministock
   ```

2. **Configurar el Backend (API)**
   ```bash
   cd api

   # Instalar dependencias
   composer install

   # Configurar entorno
   cp .env.example .env
   php artisan key:generate

   # Configurar base de datos SQLite
   touch database/database.sqlite

   # Ejecutar migraciones y seeders
   php artisan migrate --seed

   # Iniciar servidor de desarrollo
   php artisan serve
   ```

3. **Configurar el Frontend (en una terminal nueva)**
   ```bash
   cd ../frontend

   # Instalar dependencias
   npm install

   # Iniciar servidor de desarrollo
   npm run dev
   ```

4. **Acceder a la aplicación**
   - **Frontend**: http://localhost:3000
   - **API**: http://localhost:8000
   - **Documentación API**: http://localhost:8000/api/documentation (si está configurada)

### 🔧 Configuración Detallada

Para instrucciones detalladas de instalación y configuración:

- 📖 **[Documentación del Frontend](./frontend/README.md)** - Guía completa de React/TypeScript
- 📖 **[Documentación de la API](./api/README.md)** - Guía completa de Laravel/PHP

## 📊 Funcionalidades

### 👤 Sistema de Usuarios
- Registro e inicio de sesión seguro
- Roles de usuario (admin/usuario regular)
- Perfiles personalizables

### 📦 Gestión de Productos
- Crear, leer, actualizar y eliminar productos
- Control de inventario (stock disponible)
- Precios y descripciones detalladas
- Asociación con categorías

### 🏷️ Categorización
- Crear y gestionar categorías de productos
- Jerarquía organizacional
- Filtros por categoría

### 🎨 Interfaz de Usuario
- Diseño moderno y responsivo
- Modo oscuro/claro automático
- Tablas interactivas con búsqueda y filtros
- Navegación intuitiva

## 🔧 Scripts Disponibles

### Frontend
```bash
cd frontend
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Vista previa del build
npm run lint         # Ejecutar ESLint
```

### Backend
```bash
cd api
php artisan serve    # Servidor de desarrollo
php artisan test     # Ejecutar tests
php artisan migrate  # Ejecutar migraciones
./vendor/bin/pint    # Formatear código
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test         # Ejecutar tests (futuro)
```

### Backend
```bash
cd api
php artisan test     # Ejecutar tests PHPUnit
```

## 🚀 Despliegue

### Producción

1. **Backend**: Configurar servidor web (Apache/Nginx) apuntando a `api/public/`
2. **Frontend**: Build de producción y servir archivos estáticos
3. **Base de datos**: Configurar SQLite en producción o migrar a MySQL/PostgreSQL

### Variables de Entorno

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=MiniStock
```

#### Backend (.env)
```env
APP_NAME=MiniStock
APP_ENV=production
APP_KEY=your-app-key
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, lee las guías de contribución:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📖 Documentación Específica

- **[Frontend](./frontend/README.md)** - Arquitectura React, componentes, estado, API
- **[API](./api/README.md)** - Arquitectura Laravel, modelos, endpoints, testing

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **devpolamx** - *Desarrollo inicial*

## 🙏 Agradecimientos

- Laravel Framework
- React Team
- Bootstrap Team
- Comunidad Open Source

---

<p align="center">
  <strong>MiniStock</strong> - Gestiona tu inventario de manera eficiente y moderna
</p></content>
<parameter name="filePath">d:\www\ministock\README.md