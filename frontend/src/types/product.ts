import type { Product } from '../models/Product';

export type { Product };

export type ProductFormData = Pick<Product, 'name' | 'price' | 'stock' | 'category_id'>;

export interface ProductFilters {
  search?: string;
  category_id?: number;
  page?: number;
  limit?: number;
}

export interface FormErrors extends Partial<Record<keyof ProductFormData, string>> {
  general?: string;
  [key: string]: string | undefined;
}

export interface ProductFormProps {
  show: boolean;
  onHide: () => void;
  product?: Product | null;
  onSuccess?: () => void;
}