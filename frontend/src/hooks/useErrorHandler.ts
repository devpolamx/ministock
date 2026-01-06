// src/hooks/useErrorHandler.ts

import { useCallback } from 'react';

export const useErrorHandler = () => {
  const handleError = useCallback((error: Error | string, context?: string) => {
    const errorMessage = error instanceof Error ? error.message : error;
    const contextMessage = context ? ` [${context}]` : '';

    console.error(`Error${contextMessage}:`, errorMessage);

    // Aquí podrías enviar el error a un servicio de logging
    // logErrorToService(error, context);

    // Mostrar notificación al usuario (si tienes un sistema de notificaciones)
    // showNotification(errorMessage, 'error');

  }, []);

  const handleAsyncError = useCallback(async (promise: Promise<unknown>, context?: string) => {
    try {
      return await promise;
    } catch (error) {
      handleError(error as Error, context);
      throw error; // Re-throw para que el componente pueda manejarlo
    }
  }, [handleError]);

  return {
    handleError,
    handleAsyncError,
  };
};