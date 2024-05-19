import React, { useState } from 'react';
import imagenes from './imagenes';


export const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageKeys = Object.keys(imagenes);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageKeys.length) % imageKeys.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageKeys.length);
  };

  return (
    <div className="home bg-light-blue">
      <br />
      <strong>
      <p>Invefarma es una empresa colombiana dedicada a la fabricación y distribución de equipos médicos de alta calidad para el sector salud. Con más de 20 años de experiencia, Invefarma se ha posicionado como un proveedor confiable para hospitales, clínicas y centros médicos en todo el país.</p>
      </strong>
        
      <div className="image-container">
        <button className="nav-button prev-button" onClick={handlePrev}>❮</button>
        <div className="slider">
          <img
            className="image"
            src={imagenes[imageKeys[currentImageIndex]]}
            alt="Imagen"
          />
        </div>
        <button className="nav-button next-button" onClick={handleNext}>❯</button>
      </div>
    </div>
  );
};