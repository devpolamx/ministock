// src/validations/auth.ts

import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('El email debe ser válido')
    .required('El email es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(255, 'El nombre no puede exceder 255 caracteres')
    .required('El nombre es requerido'),
  email: yup
    .string()
    .email('El email debe ser válido')
    .required('El email es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});