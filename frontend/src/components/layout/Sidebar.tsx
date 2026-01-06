// src/components/layout/Sidebar.tsx

import { Link, useLocation } from 'react-router-dom';
import { Package, Tags, Users, BarChart3, Settings } from 'lucide-react';
import '../../styles/dashboard.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: BarChart3,
    },
    {
      path: '/products',
      label: 'Productos',
      icon: Package,
    },
    {
      path: '/categories',
      label: 'Categorías',
      icon: Tags,
    },
    {
      path: '/users',
      label: 'Usuarios',
      icon: Users,
    },
    {
      path: '/settings',
      label: 'Configuración',
      icon: Settings,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 sidebar-overlay"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-body position-fixed h-100 sidebar ${isOpen ? 'open' : ''}`}
      >
        <div className="p-3">
          <nav className="nav nav-pills flex-column">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link d-flex align-items-center mb-2 ${
                    isActive(item.path) ? 'active' : ''
                  }`}
                  onClick={onClose}
                >
                  <Icon size={18} className="me-2" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;