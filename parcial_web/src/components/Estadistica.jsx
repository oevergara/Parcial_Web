import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export const Estadistica = () => {
  const obtenerRegistros = () => {
    var datos = localStorage.getItem("registrosmedi");
    if (datos) {
      return JSON.parse(datos);
    } else {
      return [];
    }
  };

  const [registrosmedi, setRegistrosMedi] = useState(obtenerRegistros());

  function miEstadistica(opcion) {
    var i = 0;
    var resultado = 0;
    var miProducto;

    if (opcion === 1) {
      resultado = registrosmedi.length;
    } else if (opcion === 2) {
      for (i = 0; i < registrosmedi.length; i++) {
        miProducto = registrosmedi[i];
        resultado += parseInt(miProducto.precio);
      }
    } else if (opcion === 3) {
      for (i = 0; i < registrosmedi.length; i++) {
        miProducto = registrosmedi[i];
        resultado += parseInt(miProducto.precio);
      }
      resultado = (resultado / registrosmedi.length).toFixed(2);
    }

    return resultado;
  }

  const contarTiposDispensacion = () => {
    const tipos = {};
    registrosmedi.forEach((medicamento) => {
      const tipo = medicamento.presentacion;
      if (tipos[tipo]) {
        tipos[tipo]++;
      } else {
        tipos[tipo] = 1;
      }
    });
    return tipos;
  };

  const datosDispensacion = contarTiposDispensacion();
  const data = {
    labels: Object.keys(datosDispensacion),
    datasets: [{
      data: Object.values(datosDispensacion),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  };

  return (
    <div className="container-fluid d-flex flex-column flex-grow-1 bg-light-blue p-4">
      <div className="h3">
        <strong>RESUMEN ESTADÍSTICO</strong>
      </div>

      <div className="table-responsive">
        {registrosmedi.length > 0 ?
          <div className="row row-cols-1 row-cols-md-3 g-2" style={{ padding: 5, width: "90%", margin: "0 auto" }}>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"><strong>Cantidad de Medicamentos</strong></h5>
                  <p className="card-text">{miEstadistica(1)}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"> <strong>Suma de Precios</strong></h5>
                  <p className="card-text">${miEstadistica(2)}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"><strong>Promedio de Precios</strong></h5>
                  <p className="card-text">${miEstadistica(3)}</p>
                </div>
              </div>
            </div>
          </div>
          : <p className='h5' style={{ color: "red" }}>"No hay registros de medicamentos"</p>
        }
      </div>

      <br />

      <div className='h3' style={{ marginTop: 20 }}>
        <div>
          <strong>GRAFICO DE DISPENSACIONES</strong>
        </div>
        <br />
        
        <div style={{ width: '25%', margin: '0 auto' }}>
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}