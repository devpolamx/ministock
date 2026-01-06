// src/components/common/ConfirmDeleteModal.tsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface ConfirmDeleteModalProps {
  show: boolean;
  onHide: () => void;
  title?: string;
  message: string;
  itemName?: string;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  variant?: 'danger' | 'warning' | 'primary';
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  show,
  onHide,
  title = 'Confirmar eliminación',
  message,
  itemName,
  onConfirm,
  loading = false,
  confirmButtonText = 'Eliminar',
  cancelButtonText = 'Cancelar',
  variant = 'danger',
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      // Error handling should be done by the parent component
      console.error('Error during confirmation:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
        {itemName && (
          <p>
            <strong>{itemName}</strong>
          </p>
        )}
        <p className="text-muted mb-0">
          Esta acción no se puede deshacer.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          {cancelButtonText}
        </Button>
        <Button
          variant={variant}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Procesando...' : confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};