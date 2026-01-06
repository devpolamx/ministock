// src/components/layout/footer/Footer.tsx

import React from 'react';
import './footer.scss';
import { useTheme } from '../../../hooks/useTheme';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className={`bg-${theme === 'dark' ? 'dark' : 'light'} mt-auto text-${theme === 'dark' ? 'light' : 'dark'} footer`}>
      <div className="container-fluid py-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-light small">
              © {currentYear} MiniStock. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0 text-light small">
              Sistema de gestión de inventario
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;