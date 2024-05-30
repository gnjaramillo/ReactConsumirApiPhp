import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalProducto = ({ visible, onAgregar, onEditar, onCancel, producto }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [producto]);

  const handleGuardar = () => {
    if (producto) {
      onEditar({ ...producto, nombre, descripcion });
    } else {
      onAgregar({ nombre, descripcion });
    }
    setNombre('');
    setDescripcion('');
  };

  return (
    <Modal show={visible} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{producto ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Características:</Form.Label>
            <Form.Control
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          {producto ? 'Guardar Cambios' : 'Agregar Producto'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProducto;
