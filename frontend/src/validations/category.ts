// src/validations/category.ts

import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(255, 'El nombre no puede exceder 255 caracteres')
    .required('El nombre es requerido'),
});