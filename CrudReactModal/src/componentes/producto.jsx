import React, { useState, useEffect } from 'react';
import Tabla from './tabla';
import ModalProducto from './modalProducto';

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost/miproyecto/api/api.php")
      .then((response) => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar datos', error));
  }, []);



  const agregarProducto = (nuevoProducto) => {
    fetch("http://localhost/miproyecto/api/api.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    })
    .then((response) => response.json())
    .then(data => {
      if (data && data.id) {
        setProductos([...productos, data]);
      } else {
        console.error('Error: La respuesta no contiene el producto agregado');
      }
      setModalVisible(false);
    })
    .catch(error => console.error('Error al agregar producto', error));
  };



  const editarProducto = (productoEditado) => {
    fetch("http://localhost/miproyecto/api/api.php", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoEditado),
    })
    .then((response) => response.json())
    .then(data => {
      const productosActualizados = productos.map((producto) =>
        producto.id === productoEditado.id ? productoEditado : producto
      );
      setProductos(productosActualizados);
      setModalVisible(false);
      window.confirm('Producto editado con éxito');
    })
    .catch(error => console.error('Error al editar producto', error));
  };



  const eliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      fetch(`http://localhost/miproyecto/api/api.php?id=${id}`, {
        method: 'DELETE',
      })
      .then(() => {
        const productosFiltrados = productos.filter((producto) => producto.id !== id);
        setProductos(productosFiltrados);
      })
      .catch(error => console.error('Error al eliminar producto', error));
    }
  };



  const mostrarModalAgregar = () => {
    setProductoSeleccionado(null);
    setModalVisible(true);
  };

  const mostrarModalEditar = (producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  return (
    <div>
      <button onClick={mostrarModalAgregar}>Agregar Producto</button>
      <Tabla
        productos={productos}
        onEditar={mostrarModalEditar}
        onEliminar={eliminarProducto}
      />
      {modalVisible && (
        <ModalProducto
          visible={modalVisible}
          onAgregar={agregarProducto}
          onEditar={editarProducto}
          producto={productoSeleccionado}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default Producto;
