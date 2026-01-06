// src/pages/ProductsPage.tsx

import Layout from '../components/layout/Layout';   
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import type { Product } from '../types/product';
import { ProductList , ProductForm } from '../components/features/products';

const ProductsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    // El ProductList se actualizará automáticamente gracias al hook useProducts
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <Layout title="Productos" subtitle="Gestiona los productos de tu inventario">
      <Row>
        <Col>
          <ProductList
            onCreateProduct={handleCreateProduct}
            onEditProduct={handleEditProduct}
          />
        </Col>
      </Row>

      <ProductForm
        show={showForm}
        onHide={handleFormClose}
        product={editingProduct}
        onSuccess={handleFormSuccess}
      />
    </Layout>
  );
};

export default ProductsPage;