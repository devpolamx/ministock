// src/components/table/DataTableExample.tsx

import React from 'react';
import { DataTable } from './index';
import { type ColumnDef } from '@tanstack/react-table';

// Tipo de datos de ejemplo
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// Datos de ejemplo
const sampleData: User[] = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin', status: 'active', createdAt: '2024-01-15' },
  { id: 2, name: 'María García', email: 'maria@example.com', role: 'User', status: 'active', createdAt: '2024-01-20' },
  { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'User', status: 'inactive', createdAt: '2024-01-25' },
  { id: 4, name: 'Ana Rodríguez', email: 'ana@example.com', role: 'Moderator', status: 'active', createdAt: '2024-02-01' },
  { id: 5, name: 'Pedro Sánchez', email: 'pedro@example.com', role: 'User', status: 'active', createdAt: '2024-02-05' },
  { id: 6, name: 'Laura Martínez', email: 'laura@example.com', role: 'Admin', status: 'inactive', createdAt: '2024-02-10' },
  { id: 7, name: 'Miguel Fernández', email: 'miguel@example.com', role: 'User', status: 'active', createdAt: '2024-02-15' },
  { id: 8, name: 'Carmen Gómez', email: 'carmen@example.com', role: 'Moderator', status: 'active', createdAt: '2024-02-20' },
];

// Definición de columnas
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ getValue }) => (
      <div className="fw-semibold">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ getValue }) => {
      const role = getValue<string>();
      const badgeClass = role === 'Admin' ? 'bg-danger' :
                        role === 'Moderator' ? 'bg-warning' : 'bg-secondary';
      return (
        <span className={`badge ${badgeClass}`}>
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
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
    header: 'Fecha de Creación',
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return date.toLocaleDateString('es-ES');
    },
  },
];

const DataTableExample: React.FC = () => {
  return (
    <div>
      <h2>Ejemplo de DataTable</h2>
      <p className="text-muted mb-4">
        Esta tabla demuestra las funcionalidades de ordenamiento, búsqueda y paginación
        con soporte completo para temas claro y oscuro.
      </p>

      <DataTable
        data={sampleData}
        columns={columns}
        searchPlaceholder="Buscar usuarios..."
        emptyMessage="No se encontraron usuarios"
        pageSizeOptions={[5, 10, 25, 50]}
        defaultPageSize={5}
      />
    </div>
  );
};

export default DataTableExample;