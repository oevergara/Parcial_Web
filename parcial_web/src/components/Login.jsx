import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagenes from './imagenes';


export const Login = () => {
  const comprobarSesion = () => {
    var sesion = localStorage.getItem("miLogin");
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return false;
    }
  }

  const navigate = useNavigate();
  const [miLogin, setmiLogin] = useState(comprobarSesion());
  const [usu, setUsu] = useState("");
  const [pass, setPass] = useState("");

  function iniciarSesion(e) {
    e.preventDefault();
    var textousu = document.getElementById("textousu").value;
    var textopass = document.getElementById("textopass").value;

    if (textousu.length === 0 || textopass.length === 0) {
      alert("Por favor, ingrese los datos faltantes");
    } else {
      if ((usu === "admin" && pass === "admin") || (usu === "oscar" && pass === "1003315450")) {
        setmiLogin(true);
        localStorage.setItem("miLogin", true);
        localStorage.setItem("usu", usu);
        navigate('/Menu/Home');
      } else {
        setmiLogin(false);
        alert("Usuario y/o Contraseña no validos");
        document.getElementById("textousu").value = "";
        document.getElementById("textopass").value = "";
        document.getElementById("textousu").focus();
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">INVEFARMA</h1>
        <form id="form_login" onSubmit={iniciarSesion}>
          <div className="form-group">
            <label htmlFor="textousu"><strong>Usuario:</strong></label>
            <input type="text" id="textousu" className="form-control" onChange={(e) => setUsu(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="textopass"><strong>Contraseña:</strong></label>
            <input type="password" id="textopass" className="form-control" onChange={(e) => setPass(e.target.value)} required />
          </div>
          <input type="submit" className="btn btn-primary login-button" value="Ingresar" />
        </form>
        <img src={imagenes.invefarma} className="login-logo" alt="Logo Invefarma" />
      </div>
    </div>
  );
}