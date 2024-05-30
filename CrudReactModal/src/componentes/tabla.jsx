import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tabla = ({ productos, onEditar, onEliminar }) => {
  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={() => onEditar(producto)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => onEliminar(producto.id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
