// src/validations/product.ts

import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(255, 'El nombre no puede exceder 255 caracteres')
    .required('El nombre es requerido'),
  price: yup
    .number()
    .positive('El precio debe ser positivo')
    .required('El precio es requerido'),
  stock: yup
    .number()
    .integer('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo')
    .required('El stock es requerido'),
  category_id: yup
    .number()
    .integer('La categoría debe ser un ID válido')
    .positive('La categoría debe ser un ID válido')
    .required('La categoría es requerida'),
});