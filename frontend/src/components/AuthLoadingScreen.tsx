// src/components/AuthLoadingScreen.tsx

import { Spinner } from 'react-bootstrap';

const AuthLoadingScreen = () => {
  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <h4 className="text-muted">Verificando autenticación...</h4>
        <p className="text-muted small">Por favor espera un momento</p>
      </div>
    </div>
  );
};

export default AuthLoadingScreen;