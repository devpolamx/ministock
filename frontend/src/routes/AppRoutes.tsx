// src/routes/AppRoutes.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import ProductsPage from '../pages/ProductsPage';
import CategoriesPage from '../pages/CategoriesPage';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import AuthLoadingScreen from '../components/AuthLoadingScreen';

const AppRoutes = () => {
  const { isAuthenticated, initializing } = useAuth();

  // Mostrar pantalla de carga mientras se inicializa la autenticación
  if (initializing) {
    return <AuthLoadingScreen />;
  }

  return (
    <Routes>
      {/* Rutas públicas - redirigen a dashboard si ya está autenticado */}
      <Route
        path="/auth/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/auth/register"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
      />

      {/* Rutas protegidas - requieren autenticación */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/products"
        element={isAuthenticated ? <ProductsPage /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/categories"
        element={isAuthenticated ? <CategoriesPage /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/users"
        element={isAuthenticated ? <Users /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/settings"
        element={isAuthenticated ? <Settings /> : <Navigate to="/auth/login" />}
      />

      {/* Ruta por defecto - redirige a dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Ruta 404 - redirige a dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;