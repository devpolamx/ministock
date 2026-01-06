# MiniStock - Frontend

Aplicación web de gestión de inventario construida con React, TypeScript y Vite.

## 🚀 Tecnologías Principales

- **React 19** - Framework UI moderno con Concurrent Features
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Build tool ultrarrápido con HMR
- **Bootstrap 5.3** - Framework CSS con modo oscuro nativo
- **TanStack Table** - Tablas avanzadas con filtrado, ordenamiento y paginación
- **Axios** - Cliente HTTP para comunicación con API
- **React Router** - Enrutamiento del lado cliente
- **Redux Toolkit** - Gestión de estado global
- **Lucide React** - Iconos modernos y consistentes

## 🏗️ Arquitectura del Frontend

### Estructura de Carpetas

```
src/
├── components/           # Componentes reutilizables
│   ├── common/          # Componentes genéricos (Loading, Error, etc.)
│   ├── features/        # Componentes por funcionalidad
│   │   ├── auth/        # Login, registro, recuperación
│   │   ├── categories/  # Gestión de categorías
│   │   ├── products/    # Gestión de productos
│   │   └── users/       # Gestión de usuarios
│   ├── layout/          # Layout principal (Navbar, Sidebar, etc.)
│   └── table/           # Componente DataTable reutilizable
├── hooks/               # Hooks personalizados
│   ├── useAuth.ts       # Autenticación
│   ├── useTheme.ts      # Gestión de tema oscuro/claro
│   ├── useCategories.ts # Lógica de categorías
│   ├── useProducts.ts   # Lógica de productos
│   └── useUsers.ts      # Lógica de usuarios
├── services/            # Servicios de API
│   ├── ApiService.ts    # Cliente HTTP base
│   ├── authService.ts   # Autenticación
│   ├── categoryService.ts # Categorías
│   ├── productService.ts  # Productos
│   └── userService.ts   # Usuarios
├── store/               # Estado global (Redux)
│   ├── slices/          # Slices de Redux
│   └── index.ts         # Configuración del store
├── types/               # Definiciones TypeScript
│   ├── auth.ts          # Tipos de autenticación
│   ├── category.ts      # Tipos de categorías
│   ├── product.ts       # Tipos de productos
│   ├── user.ts          # Tipos de usuarios
│   └── index.ts         # Exportaciones de tipos
├── styles/              # Estilos globales
│   ├── login.scss       # Estilos específicos de login
│   └── dashboard.scss   # Estilos del dashboard
├── utils/               # Utilidades
├── App.tsx              # Componente raíz
├── main.tsx             # Punto de entrada
└── index.scss           # Estilos globales
```

### Componentes Principales

#### DataTable (`src/components/table/DataTable.tsx`)
Componente reutilizable para tablas avanzadas con:
- **Filtrado global** en tiempo real
- **Ordenamiento** por múltiples columnas
- **Paginación** automática
- **Estados de carga** y error
- **Modo oscuro nativo** de Bootstrap
- **Responsive** en dispositivos móviles

#### Layout Components
- **TopMenu**: Barra de navegación superior con usuario y tema
- **Sidebar**: Navegación lateral con menú colapsable
- **Layout**: Contenedor principal con sidebar y contenido

#### Feature Components
- **Auth Components**: Login, registro, recuperación de contraseña
- **CRUD Components**: Listado, creación, edición y eliminación
- **Common Components**: Loading, ErrorBoundary, ConfirmDialog

### Gestión de Estado

#### Redux Toolkit (Estado Global)
```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

#### Estado Local con Hooks
- **useAuth**: Autenticación y sesión de usuario
- **useTheme**: Modo oscuro/claro nativo de Bootstrap
- **useCategories**: CRUD de categorías con TanStack Table
- **useProducts**: CRUD de productos con TanStack Table
- **useUsers**: CRUD de usuarios con TanStack Table

### Enrutamiento

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthInitializer>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/categories" element={
            <ProtectedRoute>
              <Layout>
                <CategoryList />
              </Layout>
            </ProtectedRoute>
          } />
          {/* Más rutas... */}
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  );
}
```

### API y Servicios

#### Cliente HTTP Base
```typescript
// src/services/ApiService.ts
export class ApiService {
  private api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptores para autenticación automática
  // Manejo de errores centralizado
}
```

#### Servicios Especializados
- **AuthService**: Login, registro, refresh tokens
- **CategoryService**: CRUD completo de categorías
- **ProductService**: CRUD completo de productos
- **UserService**: CRUD completo de usuarios

### Estilos y Temas

#### Modo Oscuro Nativo de Bootstrap
```typescript
// src/hooks/useTheme.ts
export const useTheme = () => {
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-bs-theme');
    }
  }, [theme]);
};
```

#### Sistema de Estilos
- **Bootstrap 5.3**: Framework CSS principal
- **SCSS**: Variables y mixins personalizados
- **CSS Modules**: Estilos scoped cuando es necesario
- **Modo oscuro automático**: Sin estilos personalizados

### Tipos TypeScript

#### Definiciones Principales
```typescript
// src/types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id: number;
  category?: Category;
}
```

#### Props de Componentes
```typescript
export interface DataTableProps<T> {
  data?: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  enableSearch?: boolean;
  enablePagination?: boolean;
  pageSizeOptions?: number[];
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con HMR
npm run build        # Build de producción
npm run preview      # Vista previa del build
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificar tipos TypeScript

# Testing (futuro)
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
```

## 🌍 Variables de Entorno

```env
# .env.local
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=MiniStock
```

## 📦 Dependencias Principales

### Runtime Dependencies
- `react`, `react-dom` - Framework UI
- `typescript` - Tipado estático
- `bootstrap` - Framework CSS
- `@tanstack/react-table` - Tablas avanzadas
- `axios` - Cliente HTTP
- `react-router-dom` - Enrutamiento
- `@reduxjs/toolkit` - Gestión de estado
- `lucide-react` - Iconos

### Development Dependencies
- `vite` - Build tool
- `eslint` - Linting
- `@types/*` - Tipos TypeScript
- `sass` - Preprocesador CSS

## 🚀 Despliegue

```bash
# Build de producción
npm run build

# Los archivos se generan en /dist
# Configurar servidor web para servir archivos estáticos
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](../LICENSE) para más detalles.
