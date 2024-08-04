// src/components/Consultas/HistorialPartidosEntreEquipos.js

import React, { useState, useEffect } from 'react';
import partidoService from '../../services/partidoService';
import equipoService from '../../services/equipoService';
import { Table, Form, Button } from 'react-bootstrap';

const HistorialPartidosEntreEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [selectedEquipo1, setSelectedEquipo1] = useState('');
  const [selectedEquipo2, setSelectedEquipo2] = useState('');

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const data = await equipoService.getEquipos();
        setEquipos(data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      }
    };

    fetchEquipos();
  }, []);

  const handleBuscarPartidos = async () => {
    if (selectedEquipo1 && selectedEquipo2) {
      try {
        const data = await partidoService.getHistorialPartidosEntreEquipos(selectedEquipo1, selectedEquipo2);
        setPartidos(data);
      } catch (error) {
        console.error('Error fetching historial de partidos:', error);
      }
    } else {
      setPartidos([]);
    }
  };

  const getEquipoNombre = (equipoId) => {
    const equipo = equipos.find(equipo => equipo.id === equipoId);
    return equipo ? equipo.nombre : '';
  };

  return (
    <div>
      <h1>Historial de Partidos entre Equipos</h1>
      <Form>
        <Form.Group controlId="formEquipo1Select">
          <Form.Label>Selecciona el Primer Equipo</Form.Label>
          <Form.Control as="select" value={selectedEquipo1} onChange={(e) => setSelectedEquipo1(e.target.value)}>
            <option value="">Selecciona un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formEquipo2Select">
          <Form.Label>Selecciona el Segundo Equipo</Form.Label>
          <Form.Control as="select" value={selectedEquipo2} onChange={(e) => setSelectedEquipo2(e.target.value)}>
            <option value="">Selecciona un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleBuscarPartidos}>Buscar Partidos</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Equipo Local</th>
            <th>Equipo Visitante</th>
            <th>Fecha del Partido</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map((partido) => (
            <tr key={partido.id}>
              <td>{partido.id}</td>
              <td>{getEquipoNombre(partido.equipo_local_id)}</td>
              <td>{getEquipoNombre(partido.equipo_visitante_id)}</td>
              <td>{partido.fecha_partido}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HistorialPartidosEntreEquipos;
