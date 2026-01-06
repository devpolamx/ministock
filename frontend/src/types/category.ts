import type { Category } from '../models/Category';

export type { Category };

export type CategoryFormData = Pick<Category, 'name'>;

export interface CategoryFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export interface CategoryFormErrors extends Partial<Record<keyof CategoryFormData, string>> {
  general?: string;
  [key: string]: string | undefined;
}

export interface CategoryFormProps {
  show: boolean;
  onHide: () => void;
  category?: Category | null;
  onSuccess?: () => void;
}