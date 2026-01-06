// src/components/features/categories/CategoryForm.tsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Spinner } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import type { CategoryFormData, CategoryFormErrors, CategoryFormProps } from '../../../types/category';
import { useCategories } from '../../../hooks/useCategories';
import { categorySchema } from '../../../validations/category';
import * as yup from 'yup';

export const CategoryForm: React.FC<CategoryFormProps> = ({
  show,
  onHide,
  category,
  onSuccess,
}) => {
  const { createCategory, updateCategory, loading } = useCategories({ autoFetch: false });

  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
  });

  const [errors, setErrors] = useState<CategoryFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!category;

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
      });
    } else {
      setFormData({
        name: '',
      });
    }
    setErrors({});
  }, [category, show]);

  const validateForm = async (): Promise<boolean> => {
    try {
      await categorySchema.validate({
        name: formData.name,
      }, { abortEarly: false });

      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors: CategoryFormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            yupErrors[err.path] = err.message;
          }
        });
        setErrors(yupErrors);
        return false;
      }
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo
    if (errors[name as keyof CategoryFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    setSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);

      if (isEditing && category) {
        await updateCategory(category.id, submitData);
      } else {
        await createCategory(submitData);
      }

      onSuccess?.();
      onHide();
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Error al guardar la categoría',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton={!submitting}>
        <Modal.Title>
          {isEditing ? 'Editar Categoría' : 'Crear Nueva Categoría'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {errors.general && (
            <Alert variant="danger" className="mb-3">
              {errors.general}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isInvalid={!!errors.name}
              disabled={submitting}
              placeholder="Ingrese el nombre de la categoría"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            <FaTimes className="me-2" />
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={submitting || loading}
          >
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {isEditing ? 'Actualizando...' : 'Creando...'}
              </>
            ) : (
              <>
                <FaSave className="me-2" />
                {isEditing ? 'Actualizar' : 'Crear'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};