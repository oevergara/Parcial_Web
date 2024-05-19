import React, { useState, useEffect } from 'react';


export const Registrar = () => {

  const obtenerRegistros = () => {
    var datos = localStorage.getItem("registrosmedi")
    if (datos) {
      return JSON.parse(datos);
    } else {
      return [];
    }
  }

  const [registrosmedi, setRegistrosMedi] = useState(obtenerRegistros());

  const [producto, setProducto] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");

  const botonGuardar = (e) => {
    e.preventDefault();
    var miMedicamento = { producto, presentacion, cantidad, precio }
    setRegistrosMedi([...registrosmedi, miMedicamento]);
    alert('Producto registrado satisfactoriamente!');
    limpiarFormulario();
  }

  useEffect(() => {
    localStorage.setItem("registrosmedi", JSON.stringify(registrosmedi))
  }, [registrosmedi]);

  const limpiarFormulario = () => {
    setProducto("");
    setPresentacion("");
    setCantidad("");
    setPrecio("");
    document.getElementById("miFormulario").reset();
  }

  return (
    <div className="registrar-container bg-light-blue">
      <div className="form-wrapper">
        <h3 className="form-title">REGISTRO DE PRODUCTOS</h3>
        <form id="miFormulario" onSubmit={botonGuardar}>
          <div className="form-group">
            <input className="form-control form-control-lg text-center" type="text" placeholder="Nombre del producto" onChange={(e) => setProducto(e.target.value)} required />
          </div>
          <div className="form-group">
            <select className="form-select form-select-lg text-center" onChange={(e) => setPresentacion(e.target.value)} required>
              <option value="">Indique la dispensación</option>
              <option value="Tabletas">Tabletas</option>
              <option value="Gotas">Gotas</option>
              <option value="Polvo">Polvo</option>
              <option value="Líquido">Líquido</option>
            </select>
          </div>
          <div className="form-group">
            <input className="form-control form-control-lg text-center" type="text" placeholder="Cantidad" onChange={(e) => setCantidad(e.target.value)} required />
          </div>
          <div className="form-group">
            <input className="form-control form-control-lg text-center" type="number" min="1" max="100000000" placeholder="Digite el precio" onChange={(e) => setPrecio(e.target.value)} required />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-lg btn-block">Guardar Producto</button>
          </div>
        </form>
      </div>
    </div>
  )
}