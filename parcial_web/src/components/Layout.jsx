import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from './Menu'; // Asegúrate de importar el componente Menu

export const Layout = () => {
  return (
    <div>
      <Menu />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};