// src/components/layout/TopMenu.tsx

import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

interface TopMenuProps {
  onToggleSidebar?: () => void;
}

const TopMenu = ({ onToggleSidebar }: TopMenuProps) => {
  const { user, logout } = useAuth();
  const { toggleTheme } = useTheme();

  const handleLogout = () => {
    //if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    //}
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow fixed-top bg-body border-bottom"
    >
      <div className="container-fluid">
        <button
          className="btn btn-outline-secondary me-3 d-lg-none"
          onClick={onToggleSidebar}
          type="button"
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-list"></i>
        </button>

        <span className="navbar-brand mb-0 h1">MiniStock</span>

        <div className="d-flex align-items-center ms-auto">
          <button
            className="btn btn-outline-secondary me-3"
            onClick={toggleTheme}
            type="button"
            aria-label="Cambiar tema"
            title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
            <i className={`bi ${theme === 'light' ? 'bi-moon' : 'bi-sun'}`}></i>
          </button>

          <div className="dropdown">
            <button
              className={`btn dropdown-toggle d-flex align-items-center ${
                theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'
              }`}
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle me-2"></i>
              <span className="d-none d-sm-inline">{user?.name}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
              <li>
                <h6 className="dropdown-header">
                  <i className="bi bi-person me-2"></i>{user?.name}
                </h6>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" type="button">
                  <i className="bi bi-person me-2"></i>Perfil
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button">
                  <i className="bi bi-gear me-2"></i>Configuración
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  type="button"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;