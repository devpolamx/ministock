// src/components/ErrorFallback.tsx

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
  showDetails?: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  title = "Error al cargar",
  message = "Ha ocurrido un error al cargar esta sección.",
  showDetails = import.meta.env.DEV
}) => {
  return (
    <div className="card border-danger">
      <div className="card-body text-center py-5">
        <AlertTriangle size={48} className="text-danger mb-3" />
        <h5 className="card-title text-danger">{title}</h5>
        <p className="card-text text-muted">{message}</p>

        {showDetails && error && (
          <div className="alert alert-warning text-start mt-3">
            <small>
              <strong>Detalles técnicos:</strong>
              <br />
              {error.name}: {error.message}
            </small>
          </div>
        )}

        {resetError && (
          <button
            className="btn btn-outline-primary mt-3 d-flex align-items-center gap-2 mx-auto"
            onClick={resetError}
          >
            <RefreshCw size={16} />
            Intentar de nuevo
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;