// src/hooks/useCategories.ts

import { useState, useEffect, useCallback } from 'react';
import type { Category, CategoryFilters, CategoryFormData } from '../types/category';
import { categoryService } from '../services/categoryService';

interface UseCategoriesOptions {
  filters?: CategoryFilters;
  page?: number;
  limit?: number;
  autoFetch?: boolean;
}

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  refetch: () => Promise<void>;
  createCategory: (category: CategoryFormData | FormData) => Promise<Category>;
  updateCategory: (id: number, category: Partial<CategoryFormData> | FormData) => Promise<Category>;
  deleteCategory: (id: number) => Promise<void>;
  setFilters: (filters: CategoryFilters) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useCategories = (options: UseCategoriesOptions = {}): UseCategoriesReturn => {
  const {
    filters: initialFilters = {},
    page: initialPage = 1,
    limit: initialLimit = 10,
    autoFetch = true
  } = options;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [filters, setFilters] = useState<CategoryFilters>(initialFilters);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await categoryService.getCategories({
        ...filters,
        page,
        limit,
      });

      setCategories(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setCategories([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters, page, limit]);

  const refetch = useCallback(async () => {
    await fetchCategories();
  }, [fetchCategories]);

  const handleCreateCategory = useCallback(async (categoryData: CategoryFormData | FormData): Promise<Category> => {
    const newCategory = await categoryService.createCategory(categoryData);
    await refetch(); // Refetch para actualizar la lista
    return newCategory;
  }, [refetch]);

  const handleUpdateCategory = useCallback(async (id: number, categoryData: Partial<CategoryFormData> | FormData): Promise<Category> => {
    const updatedCategory = await categoryService.updateCategory(id, categoryData);
    await refetch(); // Refetch para actualizar la lista
    return updatedCategory;
  }, [refetch]);

  const handleDeleteCategory = useCallback(async (id: number): Promise<void> => {
    await categoryService.deleteCategory(id);
    await refetch(); // Refetch para actualizar la lista
  }, [refetch]);

  const handleSetFilters = useCallback((newFilters: CategoryFilters) => {
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
      fetchCategories();
    }
  }, [fetchCategories, autoFetch]);

  const totalPages = Math.ceil(total / limit);

  return {
    categories,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    refetch,
    createCategory: handleCreateCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    setFilters: handleSetFilters,
    setPage: handleSetPage,
    setLimit: handleSetLimit,
  };
};