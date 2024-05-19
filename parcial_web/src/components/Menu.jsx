import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagenes from './imagenes';

export const Menu = () => {

  const navigate = useNavigate();
  const [usu] = useState(localStorage.getItem('usu'));

  const cerrarSesion = () => {
    localStorage.removeItem('usu');
    localStorage.removeItem('miLogin');
    window.location.href = '/';
  };

  return (
    <div id="caja_menu" className="menu-container">
      <div className='bg-light-blue'>
        <div className='logo-container'>
          <img src={imagenes.invefarma} className="logo" alt="Logo izquierdo" />
          <strong className="h1">
            <strong><h1>Bienvenido: {usu.toUpperCase()}</h1></strong>
          </strong>
          <img src={imagenes.invefarma} className="logo" alt="Logo derecho" />
        </div>
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar" style={{ marginTop: 20 }}>
          <div className="container-fluid justify-content-center">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
              <div className="navbar-nav text-center">
                <NavLink to="/menu/home" className="nav-link h5 custom-nav-link">
                  Menú Principal
                </NavLink>
                <NavLink to="/menu/registrar" className="nav-link h5 custom-nav-link">
                  Registrar Productos
                </NavLink>
                <NavLink to="/menu/listar" className="nav-link h5 custom-nav-link">
                  Lista de Productos
                </NavLink>
                <NavLink to="/menu/estadistica" className="nav-link h5 custom-nav-link">
                  Estadística General
                </NavLink>
                <a className="nav-link h5 custom-nav-link" style={{ color: 'blue' }} href="#" onClick={cerrarSesion}>
                  Cerrar Sesión
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};