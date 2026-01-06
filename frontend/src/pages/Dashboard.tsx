// src/pages/Dashboard.tsx

import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const Dashboard = () => {
  return (
    <Layout title="Dashboard" subtitle="Bienvenido al sistema de gestión de inventario MiniStock">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white h-100">
            <div className="card-body text-center">
              <i className="bi bi-box-seam display-4 mb-3"></i>
              <h5 className="card-title">Productos</h5>
              <p className="card-text">Gestiona tu inventario de productos</p>
              <Link to="/products" className="btn btn-light">Ver Productos</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white h-100">
            <div className="card-body text-center">
              <i className="bi bi-tags display-4 mb-3"></i>
              <h5 className="card-title">Categorías</h5>
              <p className="card-text">Organiza tus productos por categorías</p>
              <Link to="/categories" className="btn btn-light">Ver Categorías</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-info text-white h-100">
            <div className="card-body text-center">
              <i className="bi bi-bar-chart-line display-4 mb-3"></i>
              <h5 className="card-title">Reportes</h5>
              <p className="card-text">Analiza el rendimiento de tu negocio</p>
              <Link to="/reports" className="btn btn-light">Ver Reportes</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Estadísticas Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="border-end">
                    <h3 className="text-primary">150</h3>
                    <p className="text-muted mb-0">Productos Totales</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border-end">
                    <h3 className="text-success">5</h3>
                    <p className="text-muted mb-0">Categorías</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border-end">
                    <h3 className="text-warning">25</h3>
                    <p className="text-muted mb-0">Productos Bajos en Stock</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <h3 className="text-danger">$12,500</h3>
                  <p className="text-muted mb-0">Valor Total del Inventario</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;