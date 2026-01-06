// src/components/AuthInitializer.tsx

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { getCurrentUser, setInitialized } from '../store/slices/authSlice';

const AuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Verificar token al cargar la aplicación
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          await dispatch(getCurrentUser()).unwrap();
        } catch {
          // Token inválido, será manejado por el interceptor
          console.log('Token inválido durante inicialización');
        }
      } else {
        // No hay token, marcar como inicializado
        dispatch(setInitialized());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null; // Este componente no renderiza nada
};

export default AuthInitializer;