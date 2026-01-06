// src/services/ApiService.ts

import api from './api';
import type { ProductFilters } from '../types/product';

export abstract class ApiService {
  protected async request<T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      data?: unknown;
      params?: Record<string, unknown>;
    } = {}
  ): Promise<T> {
    const { method = 'GET', data, params } = options;

    const response = await api({
      url: endpoint,
      method,
      data,
      params,
    });

    return response.data;
  }

  protected buildQueryParams(filters?: ProductFilters): Record<string, unknown> | undefined {
    if (!filters) return undefined;

    const params: Record<string, unknown> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params[key] = value;
      }
    });

    return Object.keys(params).length > 0 ? params : undefined;
  }
}