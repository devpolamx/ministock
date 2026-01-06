// src/hooks/useProducts.ts

import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductFilters, ProductFormData } from '../types/product';
import { productService } from '../services/productService';

interface UseProductsOptions {
  filters?: ProductFilters;
  page?: number;
  limit?: number;
  autoFetch?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  refetch: () => Promise<void>;
  createProduct: (product: ProductFormData | FormData) => Promise<Product>;
  updateProduct: (id: number, product: Partial<ProductFormData> | FormData) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
  setFilters: (filters: ProductFilters) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const {
    filters: initialFilters = {},
    page: initialPage = 1,
    limit: initialLimit = 10,
    autoFetch = true
  } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getProducts({
        ...filters,
        page,
        limit,
      });

      setProducts(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters, page, limit]);

  const refetch = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  const handleCreateProduct = useCallback(async (productData: ProductFormData | FormData): Promise<Product> => {
    const newProduct = await productService.createProduct(productData);
    await refetch(); // Refetch para actualizar la lista
    return newProduct;
  }, [refetch]);

  const handleUpdateProduct = useCallback(async (id: number, productData: Partial<ProductFormData> | FormData): Promise<Product> => {
    const updatedProduct = await productService.updateProduct(id, productData);
    await refetch(); // Refetch para actualizar la lista
    return updatedProduct;
  }, [refetch]);

  const handleDeleteProduct = useCallback(async (id: number): Promise<void> => {
    await productService.deleteProduct(id);
    await refetch(); // Refetch para actualizar la lista
  }, [refetch]);

  const handleSetFilters = useCallback((newFilters: ProductFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  }, []);

  const handleSetPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleSetLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [fetchProducts, autoFetch]);

  const totalPages = Math.ceil(total / limit);

  return {
    products,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    refetch,
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    setFilters: handleSetFilters,
    setPage: handleSetPage,
    setLimit: handleSetLimit,
  };
};