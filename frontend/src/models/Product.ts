// src/models/Product.ts

import type { Category } from './Category';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
  category?: Category;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}