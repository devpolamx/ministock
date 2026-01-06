// src/components/features/products/ProductList.tsx

import React, { useState, useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Product } from '../../../types/product';
import { useProducts } from '../../../hooks/useProducts';
import DataTable from '../../table/DataTable';
import { Button, Badge, InputGroup, Form, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';
import { ConfirmDeleteModal } from '../../common/ConfirmDeleteModal';

interface ProductListProps {
  onCreateProduct?: () => void;
  onEditProduct?: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  onCreateProduct,
  onEditProduct,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const {
    products,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    deleteProduct,
    setFilters,
    setPage,
    setLimit,
  } = useProducts({
    filters: { search: searchTerm },
    page: 1,
    limit: 10,
    autoFetch: true,
  });

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id);
        setShowDeleteModal(false);
        setProductToDelete(null);
      } catch {
        // Error handling is done in the hook
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilters({ search: e.target.value });
  };

  const columns = useMemo<ColumnDef<Product>[]>(() => [
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
      size: 200,
      cell: ({ getValue }) => (
        <span className="fw-medium">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
      size: 300,
      cell: ({ getValue }) => {
        const description = getValue<string>();
        return (
          <span className="text-muted" title={description}>
            {description?.length > 50 ? `${description.substring(0, 50)}...` : description}
          </span>
        );
      },
    },
    {
      accessorKey: 'price',
      header: 'Precio',
      size: 120,
      cell: ({ getValue }) => {
        const price = getValue<number>();
        return (
          <Badge bg="success" className="fs-6">
            ${price?.toFixed(2)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      size: 100,
      cell: ({ getValue }) => {
        const stock = getValue<number>();
        const variant = stock === 0 ? 'danger' : stock < 10 ? 'warning' : 'primary';
        return (
          <Badge bg={variant}>
            {stock}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'category',
      header: 'Categoría',
      size: 150,
      cell: ({ row }) => {
        const category = row.original.category;
        return category ? (
          <Badge bg="secondary">{category.name}</Badge>
        ) : (
          <span className="text-muted">Sin categoría</span>
        );
      },
    },
    {
      accessorKey: 'is_active',
      header: 'Estado',
      size: 100,
      cell: ({ getValue }) => {
        const isActive = getValue<boolean>();
        return (
          <Badge bg={isActive ? 'success' : 'danger'}>
            {isActive ? 'Activo' : 'Inactivo'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      size: 150,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEditProduct?.(product)}
              title="Editar producto"
            >
              <FaEdit />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDeleteClick(product)}
              title="Eliminar producto"
            >
              <FaTrash />
            </Button>
          </div>
        );
      },
    },
  ], [onEditProduct]);

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error al cargar productos</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <div className="product-list">
      {/* Header con controles */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Productos</h2>
          <small className="text-muted">
            {total} producto{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
          </small>
        </div>
        <Button
          variant="primary"
          onClick={onCreateProduct}
          className="d-flex align-items-center gap-2"
        >
          <FaPlus />
          Nuevo Producto
        </Button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="d-flex gap-3 mb-3">
        <InputGroup className="flex-grow-1" style={{ maxWidth: '400px' }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <Button
          variant="outline-secondary"
          onClick={() => setShowFilters(!showFilters)}
          className="d-flex align-items-center gap-2"
        >
          <FaFilter />
          Filtros
        </Button>
      </div>

      {/* Filtros avanzados (colapsables) */}
      {showFilters && (
        <div className="border rounded p-3 mb-3">
          <Form>
            <div className="row g-3">
              <div className="col-md-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select>
                  <option value="">Todas las categorías</option>
                  {/* TODO: Implementar categorías dinámicas */}
                </Form.Select>
              </div>
              <div className="col-md-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select>
                  <option value="">Todos</option>
                  <option value="active">Activos</option>
                  <option value="inactive">Inactivos</option>
                </Form.Select>
              </div>
              <div className="col-md-3">
                <Form.Label>Stock mínimo</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </div>
              <div className="col-md-3">
                <Form.Label>Stock máximo</Form.Label>
                <Form.Control type="number" placeholder="9999" />
              </div>
            </div>
          </Form>
        </div>
      )}

      {/* Tabla de productos */}
      <DataTable
        data={products || []}
        columns={columns}
        loading={loading}        
        enableSearch={false}
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
        message="¿Estás seguro de que deseas eliminar el producto"
        itemName={productToDelete?.name}
        onConfirm={handleDeleteConfirm}
        loading={loading}
      />
    </div>
  );
};