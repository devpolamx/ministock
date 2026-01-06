// src/components/ErrorBoundary.tsx

import React, { Component } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
          <div className="text-center p-5">
            <div className="mb-4">
              <AlertTriangle size={64} className="text-danger" />
            </div>
            <h1 className="h3 mb-3 text-danger">¡Oops! Algo salió mal</h1>
            <p className="text-muted mb-4">
              Ha ocurrido un error inesperado. Nuestros desarrolladores han sido notificados.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="alert alert-warning text-start mb-4" role="alert">
                <h6 className="alert-heading">Detalles del error (modo desarrollo):</h6>
                <code className="small">
                  {this.state.error.name}: {this.state.error.message}
                  {this.state.error.stack && (
                    <pre className="mt-2" style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
                      {this.state.error.stack}
                    </pre>
                  )}
                </code>
              </div>
            )}

            <div className="d-flex gap-2 justify-content-center">
              <button
                className="btn btn-primary d-flex align-items-center gap-2"
                onClick={this.handleReset}
              >
                <RefreshCw size={16} />
                Intentar de nuevo
              </button>
              <button
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
                onClick={() => window.location.href = '/'}
              >
                <Home size={16} />
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;