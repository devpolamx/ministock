// src/pages/auth/Login.tsx

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { loginSchema } from '../../validations/auth';
import '../../styles/login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      // Validar con Yup
      await loginSchema.validate({ email, password }, { abortEarly: false });

      // Si la validación pasa, intentar login
      await login({ email, password });
      navigate('/dashboard');
    } catch (validationError: unknown) {
      if (validationError && typeof validationError === 'object' && 'name' in validationError && 'inner' in validationError) {
        // Errores de Yup
        const yupError = validationError as { name: string; inner: Array<{ path: string; message: string }> };
        if (yupError.name === 'ValidationError') {
          const errors: {[key: string]: string} = {};
          yupError.inner.forEach((err) => {
            errors[err.path] = err.message;
          });
          setValidationErrors(errors);
        }
      } else {
        // Error del servidor (ya manejado por Redux)
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Limpiar error de validación cuando el usuario empiece a escribir
    if (validationErrors.email) {
      setValidationErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Limpiar error de validación cuando el usuario empiece a escribir
    if (validationErrors.password) {
      setValidationErrors(prev => ({ ...prev, password: '' }));
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center min-h-screen">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="login-card card shadow-lg">
              <div className="card-body p-5">
                <div className="login-header">
                  <h1 className="login-title">MiniStock</h1>
                  <p className="login-subtitle">Inicia sesión en tu cuenta</p>
                </div>

                {error && (
                  <div className="login-alert alert alert-danger d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-floating">
                    <input
                      type="email"
                      className={`form-control ${validationErrors.email || error ? 'is-invalid' : ''}`}
                      id="email"
                      value={email}
                      placeholder=""
                      onChange={handleEmailChange}
                      autoComplete="email"
                    />
                    <label htmlFor="email">
                      <Mail size={18} className="me-2" />
                      Correo electrónico
                    </label>
                    {validationErrors.email && (
                      <div className="invalid-feedback d-block">
                        {validationErrors.email}
                      </div>
                    )}
                  </div>

                  <div className="form-floating">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${validationErrors.password || error ? 'is-invalid' : ''}`}
                      id="password"
                      value={password}
                      placeholder=""
                      onChange={handlePasswordChange}
                      autoComplete="current-password"
                    />
                    <label htmlFor="password">
                      <Lock size={18} className="me-2" />
                      Contraseña
                    </label>
                    <button
                      type="button"
                      className="btn input-group-text"
                      onClick={togglePasswordVisibility}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {validationErrors.password && (
                      <div className="invalid-feedback d-block">
                        {validationErrors.password}
                      </div>
                    )}
                  </div>

                  <div className="login-actions">
                    <button
                      type="submit"
                      className="btn login-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Iniciando sesión...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Iniciar Sesión
                        </>
                      )}
                    </button>

                    <div className="login-links">
                      <span className="text-muted">¿No tienes cuenta? </span>
                      <Link to="/auth/register" className="login-link">
                        Regístrate aquí
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;