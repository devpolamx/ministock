// src/components/LoadingErrorWrapper.tsx

import React from 'react';
import type { ReactNode } from 'react';
import { Spinner } from 'react-bootstrap';
import ErrorFallback from './ErrorFallback';

interface LoadingErrorWrapperProps {
  loading: boolean;
  error?: string | Error | null;
  onRetry?: () => void;
  children: ReactNode;
  loadingMessage?: string;
  errorTitle?: string;
  errorMessage?: string;
}

const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({
  loading,
  error,
  onRetry,
  children,
  loadingMessage = "Cargando...",
  errorTitle = "Error al cargar",
  errorMessage = "Ha ocurrido un error al cargar los datos."
}) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <p className="text-muted">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorFallback
        error={error instanceof Error ? error : new Error(typeof error === 'string' ? error : 'Unknown error')}
        resetError={onRetry}
        title={errorTitle}
        message={errorMessage}
      />
    );
  }

  return <>{children}</>;
};

export default LoadingErrorWrapper;