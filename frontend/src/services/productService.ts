// src/services/productService.ts

import { ApiService } from './ApiService';
import type { Product, ProductFormData, ProductFilters } from '../types/product';

export class ProductService extends ApiService {
  async getProducts(filters?: ProductFilters): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
    const params = this.buildQueryParams(filters);
    return this.request('/products', { params });
  }

  async getProduct(id: number): Promise<Product> {
    return this.request(`/products/${id}`);
  }

  async createProduct(product: ProductFormData | FormData): Promise<Product> {
    return this.request('/products', {
      method: 'POST',
      data: product,
    });
  }

  async updateProduct(id: number, product: Partial<ProductFormData> | FormData): Promise<Product> {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      data: product,
    });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }
}

export const productService = new ProductService();