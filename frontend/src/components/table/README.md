# DataTable Component

Componente personalizado de tabla avanzada construido con TanStack Table v8 que incluye funcionalidades de ordenamiento, búsqueda global, paginación y soporte completo para temas claro/oscuro.

## Características

- ✅ **Ordenamiento de columnas**: Click en los headers para ordenar ascendente/descendente
- ✅ **Búsqueda global**: Barra de búsqueda que filtra en todas las columnas
- ✅ **Paginación**: Navegación por páginas con selector de tamaño de página
- ✅ **Temas**: Soporte completo para temas claro y oscuro
- ✅ **Responsive**: Diseño adaptativo para diferentes tamaños de pantalla
- ✅ **Estados de carga**: Indicador de carga integrado
- ✅ **Estados vacíos**: Mensaje personalizado cuando no hay datos
- ✅ **Accesibilidad**: Etiquetas ARIA y navegación por teclado

## Instalación

El componente requiere TanStack Table v8 que ya está instalado en el proyecto.

```bash
npm install @tanstack/react-table
```

## Uso Básico

```tsx
import { DataTable } from '@/components/table';
import { type ColumnDef } from '@tanstack/react-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
  },
];

const data: User[] = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin' },
  // ... más datos
];

function UsersPage() {
  return (
    <DataTable
      data={data}
      columns={columns}
    />
  );
}
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `data` | `T[]` | - | Array de datos a mostrar |
| `columns` | `ColumnDef<T>[]` | - | Definición de columnas |
| `loading` | `boolean` | `false` | Muestra estado de carga |
| `searchPlaceholder` | `string` | `"Buscar..."` | Placeholder del campo de búsqueda |
| `emptyMessage` | `string` | `"No se encontraron registros"` | Mensaje cuando no hay datos |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Opciones de tamaño de página |
| `defaultPageSize` | `number` | `10` | Tamaño de página inicial |

## Definición de Columnas

```tsx
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    // Celda personalizada
    cell: ({ getValue }) => (
      <strong>{getValue<string>()}</strong>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    // Formateo personalizado
    cell: ({ getValue }) => {
      const status = getValue<'active' | 'inactive'>();
      return (
        <span className={`badge ${status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
          {status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha',
    // Formateo de fecha
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return date.toLocaleDateString('es-ES');
    },
  },
];
```

## Temas

El componente automáticamente se adapta a los temas claro y oscuro usando las clases de Bootstrap:

- **Tema claro**: `bg-light text-dark`
- **Tema oscuro**: `bg-dark text-light`

Los estilos están definidos en `DataTable.scss` y usan variables CSS para mantener consistencia.

## Estados Especiales

### Estado de Carga
```tsx
<DataTable
  data={[]}
  columns={columns}
  loading={true}
/>
```

### Estado Vacío
```tsx
<DataTable
  data={[]}
  columns={columns}
  emptyMessage="No hay usuarios registrados"
/>
```

## Personalización de Estilos

Los estilos están organizados en `DataTable.scss` y pueden ser personalizados modificando las variables CSS o agregando nuevas reglas.

## Ejemplo Completo

Ver `DataTableExample.tsx` para un ejemplo completo con datos de muestra y diferentes tipos de columnas.