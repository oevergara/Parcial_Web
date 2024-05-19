import React, { useState, useRef, useEffect } from 'react';


export const Listar = () => {
  const obtenerRegistros = () => {
    var datos = localStorage.getItem("registrosmedi");
    if (datos) {
      return JSON.parse(datos);
    } else {
      return [];
    }
  };

  const [registrosmedi, setRegistrosMedi] = useState(obtenerRegistros());
  const [editIndex, setEditIndex] = useState(null);
  const [editProducto, setEditProducto] = useState("");
  const [editPresentacion, setEditPresentacion] = useState("");
  const [editCantidad, setEditCantidad] = useState("");
  const [editPrecio, setEditPrecio] = useState("");
  const editFormRef = useRef(null);

  const botonEliminar = (miIndex) => {
    if (window.confirm("¿Está seguro de eliminar este producto?")) {
      var registrosFiltrados = registrosmedi.filter((e, index) => {
        return miIndex !== index;
      });
      setRegistrosMedi(registrosFiltrados);
    }
  };

  const botonEditar = (miIndex) => {
    const medicamento = registrosmedi[miIndex];
    setEditIndex(miIndex);
    setEditProducto(medicamento.producto);
    setEditPresentacion(medicamento.presentacion);
    setEditCantidad(medicamento.cantidad);
    setEditPrecio(medicamento.precio);
  };

  const handleEditSave = () => {
    const actualizarMedicamento = {
      producto: editProducto,
      presentacion: editPresentacion,
      cantidad: editCantidad,
      precio: editPrecio,
    };

    const actualizarRegistros = registrosmedi.map((medicamento, index) =>
      index === editIndex ? actualizarMedicamento : medicamento
    );

    setRegistrosMedi(actualizarRegistros);
    setEditIndex(null);
    setEditProducto("");
    setEditPresentacion("");
    setEditCantidad("");
    setEditPrecio("");
    alert("Producto modificado satisfactoriamente");
  };

  useEffect(() => {
    localStorage.setItem("registrosmedi", JSON.stringify(registrosmedi));
  }, [registrosmedi]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editFormRef.current && !editFormRef.current.contains(event.target)) {
        setEditIndex(null);
      }
    };

    if (editIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editIndex]);

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 bg-light-blue">
      <h3 className="text-center text-primary my-4"><strong>LISTADO DE PRODUCTOS</strong></h3>

      <div className="table-responsive flex-grow-1">
        {registrosmedi.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead className="thead-light text-center">
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Presentación</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {registrosmedi.map((x, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{x.producto}</td>
                  <td>{x.presentacion}</td>
                  <td>{x.cantidad}</td>
                  <td>{x.precio}</td>
                  <td>
                    <button className="btn btn-outline-primary" onClick={() => botonEditar(index)}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-outline-danger" onClick={() => botonEliminar(index)}>
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-danger">No hay registros de medicamentos</p>
        )}
      </div>

      {editIndex !== null && (
        <div className="edit-form bg-light p-4 mt-4 rounded" ref={editFormRef}>
          <h4 className="text-center text-secondary mb-4"><strong>EDITAR PRODUCTO</strong></h4>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleEditSave();
          }}>
            <div className="form-group row">
              <div className="col-md-6 mb-3">
                <input
                  className="form-control form-control-lg text-center"
                  type="text"
                  placeholder="Nombre del producto"
                  value={editProducto}
                  onChange={(e) => setEditProducto(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <select
                  className="form-control form-control-lg text-center"
                  value={editPresentacion}
                  onChange={(e) => setEditPresentacion(e.target.value)}
                  required
                >
                  <option value="">Indique la dispensación</option>
                  <option value="Tabletas">Tabletas</option>
                  <option value="Gotas">Gotas</option>
                  <option value="Polvo">Polvo</option>
                  <option value="Líquido">Líquido</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-6 mb-3">
                <input
                  className="form-control form-control-lg text-center"
                  type="text"
                  placeholder="Cantidad"
                  value={editCantidad}
                  onChange={(e) => setEditCantidad(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  className="form-control form-control-lg text-center"
                  type="number"
                  min="1"
                  max="100000000"
                  placeholder="Digite el precio"
                  value={editPrecio}
                  onChange={(e) => setEditPrecio(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col text-center">
                <button className="btn btn-success btn-lg" type="submit">Guardar Cambios</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};