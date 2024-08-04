// src/components/Consultas/HistorialResultadosEquipo.js

import React, { useState, useEffect } from 'react';
import equipoService from '../../services/equipoService';
import partidoService from '../../services/partidoService';
import { Table, Form, Button } from 'react-bootstrap';

const HistorialResultadosEquipo = () => {
  const [equipos, setEquipos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState('');

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const data = await equipoService.getEquipos();
        setEquipos(data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      }
    };

    const fetchPartidos = async () => {
      try {
        const data = await partidoService.getPartidos();
        setPartidos(data);
      } catch (error) {
        console.error('Error fetching partidos:', error);
      }
    };

    fetchEquipos();
    fetchPartidos();
  }, []);

  const handleBuscarResultados = async () => {
    if (selectedEquipo) {
      try {
        const data = await equipoService.getHistorialResultadosPorEquipo(selectedEquipo);
        setResultados(data);
      } catch (error) {
        console.error('Error fetching historial de resultados por equipo:', error);
      }
    } else {
      setResultados([]);
    }
  };

  const getEquipoNombre = (equipoId) => {
    const equipo = equipos.find(equipo => equipo.id === equipoId);
    return equipo ? equipo.nombre : 'Desconocido';
  };

  const getPartidoNombres = (partidoId) => {
    const partido = partidos.find(partido => partido.id === partidoId);
    if (!partido) return 'Desconocido vs Desconocido';
    const equipoLocalNombre = getEquipoNombre(partido.equipo_local_id);
    const equipoVisitanteNombre = getEquipoNombre(partido.equipo_visitante_id);
    return `${equipoLocalNombre} vs ${equipoVisitanteNombre}`;
  };

  return (
    <div>
      <h1>Historial de Resultados por Equipo</h1>
      <Form>
        <Form.Group controlId="formEquipoSelect">
          <Form.Label>Selecciona un Equipo</Form.Label>
          <Form.Control as="select" value={selectedEquipo} onChange={(e) => setSelectedEquipo(e.target.value)}>
            <option value="">Selecciona un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleBuscarResultados}>Buscar Resultados</Button>
      </Form>
      {resultados.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Partido</th>
              <th>Puntaje Equipo Local</th>
              <th>Puntaje Equipo Visitante</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado) => (
              <tr key={resultado.id}>
                <td>{resultado.id}</td>
                <td>{getPartidoNombres(resultado.partido_id)}</td>
                <td>{resultado.puntaje_equipo_local}</td>
                <td>{resultado.puntaje_equipo_visitante}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default HistorialResultadosEquipo;
