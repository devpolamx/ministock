// src/services/categoryService.ts

import { ApiService } from './ApiService';
import type { Category, CategoryFormData, CategoryFilters } from '../types/category';

export class CategoryService extends ApiService {
  async getCategories(filters?: CategoryFilters): Promise<{ data: Category[]; total: number; page: number; limit: number }> {
    const params = this.buildQueryParams(filters);
    return this.request('/categories', { params });
  }

  async getCategory(id: number): Promise<Category> {
    return this.request(`/categories/${id}`);
  }

  async createCategory(category: CategoryFormData | FormData): Promise<Category> {
    return this.request('/categories', {
      method: 'POST',
      data: category,
    });
  }

  async updateCategory(id: number, category: Partial<CategoryFormData> | FormData): Promise<Category> {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      data: category,
    });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.request(`/categories/${id}`, {
      method: 'DELETE',
    });
  }
}

export const categoryService = new CategoryService();