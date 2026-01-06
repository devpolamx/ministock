// src/components/features/categories/CategoryList.tsx

import React, { useState, useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Category } from '../../../types/category';
import { useCategories } from '../../../hooks/useCategories';
import DataTable from '../../table/DataTable';
import { Button, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { ConfirmDeleteModal } from '../../common/ConfirmDeleteModal';

interface CategoryListProps {
  onCreateCategory?: () => void;
  onEditCategory?: (category: Category) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  onCreateCategory,
  onEditCategory,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const {
    categories,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    deleteCategory,
    setPage,
    setLimit,
  } = useCategories({
    page: 1,
    limit: 10,
    autoFetch: true,
  });

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete.id);
        setShowDeleteModal(false);
        setCategoryToDelete(null);
      } catch {
        // Error handling is done in the hook
      }
    }
  };

  const columns = useMemo<ColumnDef<Category>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 80,
      cell: ({ getValue }) => (
        <span className="fw-bold">#{getValue<number>()}</span>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
      size: 300,
      cell: ({ getValue }) => (
        <span className="fw-medium">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Creado',
      size: 150,
      cell: ({ getValue }) => {
        const date = new Date(getValue<string>());
        return (
          <span className="text-muted">
            {date.toLocaleDateString('es-ES')}
          </span>
        );
      },
    },
    {
      accessorKey: 'updated_at',
      header: 'Actualizado',
      size: 150,
      cell: ({ getValue }) => {
        const date = new Date(getValue<string>());
        return (
          <span className="text-muted">
            {date.toLocaleDateString('es-ES')}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      size: 150,
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEditCategory?.(category)}
              title="Editar categoría"
            >
              <FaEdit />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDeleteClick(category)}
              title="Eliminar categoría"
            >
              <FaTrash />
            </Button>
          </div>
        );
      },
    },
  ], [onEditCategory]);

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error al cargar categorías</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <div className="category-list">
      {/* Header con controles */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Categorías</h2>
          <small className="text-muted">
            {total} categor{total !== 1 ? 'ías' : 'ía'} encontrado{total !== 1 ? 's' : ''}
          </small>
        </div>
        <Button
          variant="primary"
          onClick={onCreateCategory}
          className="d-flex align-items-center gap-2"
        >
          <FaPlus />
          Nueva Categoría
        </Button>
      </div>

      {/* Tabla de categorías */}
      <DataTable
        data={categories || []}
        columns={columns}
        loading={loading}
        enableSearch={true}
        pageCount={totalPages}
        pageIndex={page - 1}
        pageSize={limit}
        onPageChange={setPage}
        onPageSizeChange={setLimit}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
      />

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        message="¿Estás seguro de que deseas eliminar la categoría"
        itemName={categoryToDelete?.name}
        onConfirm={handleDeleteConfirm}
        loading={loading}
      />
    </div>
  );
};