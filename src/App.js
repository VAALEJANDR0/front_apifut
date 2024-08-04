// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import EquiposList from './components/EquiposList';
import JugadoresList from './components/JugadoresList';
import PartidosList from './components/PartidosList';
import ResultadosList from './components/ResultadosList';
import JugadoresPorEquipo from './components/Consultas/JugadoresPorEquipo';
import PartidosPorEquipo from './components/Consultas/PartidosPorEquipo';
import ResultadosPorPartido from './components/Consultas/ResultadosPorPartido';
import JugadoresPorPosicion from './components/Consultas/JugadoresPorPosicion';
import HistorialPartidosEntreEquipos from './components/Consultas/HistorialPartidosEntreEquipos';
import TotalGolesEquipo from './components/Consultas/TotalGolesEquipo';
import PartidosGanadosEquipo from './components/Consultas/PartidosGanadosEquipo';
import HistorialResultadosEquipo from './components/Consultas/HistorialResultadosEquipo';
import DetallesJugador from './components/Consultas/DetallesJugador';
import ProximoPartidoEquipo from './components/Consultas/ProximoPartidoEquipo';
import JugadoresConEquipo from './components/Consultas/JugadoresConEquipo';
import DetallesPartido from './components/Consultas/DetallesPartido';
import ResultadosPorEquipo from './components/Consultas/ResultadosPorEquipo';
import RendimientoPorEquipo from './components/Consultas/RendimientoPorEquipo';
import Inicio from './components/Inicio';




const App = () => {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />}/>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/equipos" element={<EquiposList />} />
          <Route path="/jugadores" element={<JugadoresList />} />
          <Route path="/partidos" element={<PartidosList />} />
          <Route path="/resultados" element={<ResultadosList />} />
          <Route path="/consultas/jugadores-por-equipo" element={<JugadoresPorEquipo />} />
          <Route path="/consultas/partidos-por-equipo" element={<PartidosPorEquipo />} />
          <Route path="/consultas/resultados-por-partido" element={<ResultadosPorPartido />} />
          <Route path="/consultas/jugadores-por-posicion" element={<JugadoresPorPosicion />} />
          <Route path="/consultas/historial-partidos-entre-equipos" element={<HistorialPartidosEntreEquipos />} />
          <Route path="/consultas/total-goles-equipo" element={<TotalGolesEquipo />} />
          <Route path="/consultas/partidos-ganados-equipo" element={<PartidosGanadosEquipo />} />
          <Route path="/consultas/historial-resultados-equipo" element={<HistorialResultadosEquipo />} />
          <Route path="/consultas/detalles-jugador" element={<DetallesJugador />} />
          <Route path="/consultas/proximo-partido-equipo" element={<ProximoPartidoEquipo />} />
          <Route path="/consultas/jugadores-con-equipo" element={<JugadoresConEquipo />} />
          <Route path="/consultas/detalles-partido" element={<DetallesPartido />} />
          <Route path="/consultas/resultados-por-equipo" element={<ResultadosPorEquipo />} />
          <Route path="/consultas/rendimiento-equipo" element={<RendimientoPorEquipo />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
