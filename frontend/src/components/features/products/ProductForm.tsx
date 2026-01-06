import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import type { ProductFormData, FormErrors, ProductFormProps } from '../../../types/product';
import { useProducts } from '../../../hooks/useProducts';
import { productSchema } from '../../../validations/product';
import * as yup from 'yup';

export const ProductForm: React.FC<ProductFormProps> = ({
  show,
  onHide,
  product,
  onSuccess,
}) => {
  const { createProduct, updateProduct, loading } = useProducts({ autoFetch: false });

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    stock: 0,
    category_id: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
      });
    } else {
      setFormData({
        name: '',
        price: 0,
        stock: 0,
        category_id: 0,
      });
    }
    setErrors({});
  }, [product, show]);

  const validateForm = async (): Promise<boolean> => {
    try {
      // Validar campos con Yup
      await productSchema.validate({
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
        category_id: formData.category_id,
      }, { abortEarly: false });

      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors: FormErrors = {};
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
    }));

    // Limpiar error del campo
    if (errors[name as keyof FormErrors]) {
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

      // Agregar campos de texto
      submitData.append('name', formData.name);
      submitData.append('price', formData.price.toString());
      submitData.append('stock', formData.stock.toString());

      if (formData.category_id) {
        submitData.append('category_id', formData.category_id.toString());
      }

      if (isEditing && product) {
        await updateProduct(product.id, submitData);
      } else {
        await createProduct(submitData);
      }

      onSuccess?.();
      onHide();
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Error al guardar el producto',
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
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton={!submitting}>
        <Modal.Title>
          {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {errors.general && (
            <Alert variant="danger" className="mb-3">
              {errors.general}
            </Alert>
          )}

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  isInvalid={!!errors.name}
                  disabled={submitting}
                  placeholder="Ingrese el nombre del producto"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      isInvalid={!!errors.price}
                      disabled={submitting}
                      placeholder="0.00"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Stock *</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      isInvalid={!!errors.stock}
                      disabled={submitting}
                      placeholder="0"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.stock}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="category_id"
                  title="Categoria"
                  aria-label="Categoria"
                  value={formData.category_id || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      category_id: value ? parseInt(value, 10) : 0,
                    }));
                  }}
                  disabled={submitting}
                >
                  <option value="">Seleccionar categoría</option>
                  {/* TODO: Cargar categorías dinámicamente */}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
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