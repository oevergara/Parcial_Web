import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Layout } from "./components/Layout"; // Importa el nuevo componente Layout
import { Registrar } from "./components/Registrar";
import { Listar } from "./components/Listar";
import { Estadistica } from "./components/Estadistica";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/menu/*" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="listar" element={<Listar />} />
            <Route path="estadistica" element={<Estadistica />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;