// src/components/table/DataTable.tsx

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Database } from 'lucide-react';
import './DataTable.scss';

export interface DataTableProps<T> {
  data?: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  // Props de paginación externa (para compatibilidad)
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  // Props de configuración
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
}

function DataTable<T>({
  data = [],
  columns,
  loading = false,
  enableSearch = true,
  searchPlaceholder = "Buscar...",
  emptyMessage = "No se encontraron registros",
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  // Props de paginación externa (para compatibilidad)
  pageCount,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
  // Props de configuración
  enableSorting = true,
  enablePagination = true,
}: DataTableProps<T>) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableSearch ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    ...(enableSearch && {
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: 'includesString',
    }),
    ...(pageCount !== undefined && {
      pageCount,
      manualPagination: true,
    }),
    onPaginationChange: (updater) => {
      if (onPageChange && onPageSizeChange) {
        if (typeof updater === 'function') {
          const newState = updater({ pageIndex: pageIndex ?? 0, pageSize: pageSize ?? defaultPageSize });
          onPageChange(newState.pageIndex);
          onPageSizeChange(newState.pageSize);
        }
      } else {
        // Paginación interna
        if (typeof updater === 'function') {
          const newState = updater(table.getState().pagination);
          table.setPageIndex(newState.pageIndex);
          table.setPageSize(newState.pageSize);
        }
      }
    },
    state: {
      sorting,
      columnFilters,
      ...(enableSearch && { globalFilter }),
      pagination: {
        pageIndex: pageIndex ?? 0,
        pageSize: pageSize ?? defaultPageSize,
      },
    },
  });

  const getSortIcon = (column: { getIsSorted: () => false | 'asc' | 'desc' }) => {
    const sortDirection = column.getIsSorted();
    if (!sortDirection) return <ChevronsUpDown size={16} className="sort-icon" />;
    return sortDirection === 'asc'
      ? <ChevronUp size={16} className="sort-icon" />
      : <ChevronDown size={16} className="sort-icon" />;
  };

  if (loading) {
    return (
      <div className="data-table-container">
        <div className="table-loading">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          Cargando datos...
        </div>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      {/* Barra de búsqueda - opcional */}
      {enableSearch && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="table-search">
            <div className="input-group">
              <span className="input-group-text">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder={searchPlaceholder}
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="table-pagination">
            <div className="page-size-selector">
              <label>Mostrar:</label>
              <select
                className="form-select form-select-sm"
                value={pageSize ?? table.getState().pagination.pageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  if (onPageSizeChange) {
                    onPageSizeChange(newSize);
                  } else {
                    table.setPageSize(newSize);
                  }
                }}
                aria-label="Paginacion"
                title="Seleccionar número de filas por página"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Selector de página cuando no hay búsqueda */}
      {!enableSearch && (
        <div className="d-flex justify-content-end mb-3">
          <div className="table-pagination">
            <div className="page-size-selector">
              <label>Mostrar:</label>
              <select
                className="form-select form-select-sm"
                value={pageSize ?? table.getState().pagination.pageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  if (onPageSizeChange) {
                    onPageSizeChange(newSize);
                  } else {
                    table.setPageSize(newSize);
                  }
                }}
                aria-label="Paginacion"
                title="Seleccionar número de filas por página"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={header.column.getCanSort() ? 'sortable' : ''}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : (
                        <div className="d-flex align-items-center justify-content-between">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && getSortIcon(header.column)}
                        </div>
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="table-empty">
                  <Database size={48} />
                  <div>{emptyMessage}</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación simplificada con Bootstrap */}
      {table.getRowModel().rows.length > 0 && table.getPageCount() > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted small">
            Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            de {table.getFilteredRowModel().rows.length} registros
          </div>

          <nav aria-label="Paginación de tabla">
            <ul className="pagination pagination">
              <li className={`page-item ${!table.getCanPreviousPage() ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Página anterior"
                >
                  Anterior
                </button>
              </li>

              {/* Números de página */}
              {(() => {
                const currentPage = table.getState().pagination.pageIndex;
                const totalPages = table.getPageCount();
                const pages = [];

                // Mostrar máximo 5 páginas alrededor de la actual
                const startPage = Math.max(0, currentPage - 2);
                const endPage = Math.min(totalPages - 1, currentPage + 2);

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => table.setPageIndex(i)}
                        aria-label={`Página ${i + 1}`}
                        aria-current={i === currentPage ? 'page' : undefined}
                      >
                        {i + 1}
                      </button>
                    </li>
                  );
                }

                return pages;
              })()}

              <li className={`page-item ${!table.getCanNextPage() ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Página siguiente"
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default DataTable;