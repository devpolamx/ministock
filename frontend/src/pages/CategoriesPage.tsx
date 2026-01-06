// src/pages/CategoriesPage.tsx

import Layout from '../components/layout/Layout';
import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import type { Category } from '../types/category';
import { CategoryList, CategoryForm } from '../components/features/categories';

const CategoriesPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCategory(null);
    // El CategoryList se actualizará automáticamente gracias al hook useCategories
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <Layout title="Categorías" subtitle="Gestiona las categorías de productos">
      <Row>
        <Col>
          <CategoryList
            onCreateCategory={handleCreateCategory}
            onEditCategory={handleEditCategory}
          />
        </Col>
      </Row>

      <CategoryForm
        show={showForm}
        onHide={handleFormClose}
        category={editingCategory}
        onSuccess={handleFormSuccess}
      />
    </Layout>
  );
};

export default CategoriesPage;