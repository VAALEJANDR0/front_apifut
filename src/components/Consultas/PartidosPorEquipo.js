// src/components/Consultas/PartidosPorEquipo.js

import React, { useState, useEffect } from 'react';
import partidoService from '../../services/partidoService';
import equipoService from '../../services/equipoService';
import { Table, Form } from 'react-bootstrap';

const PartidosPorEquipo = () => {
  const [equipos, setEquipos] = useState([]);
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

    fetchEquipos();
  }, []);

  const handleEquipoChange = async (e) => {
    const equipoId = e.target.value;
    setSelectedEquipo(equipoId);
    if (equipoId) {
      try {
        const data = await partidoService.getPartidosPorEquipo(equipoId);
        setPartidos(data);
      } catch (error) {
        console.error('Error fetching partidos:', error);
      }
    } else {
      setPartidos([]);
    }
  };

  return (
    <div>
      <h1>Partidos por Equipo</h1>
      <Form>
        <Form.Group controlId="formEquipoSelect">
          <Form.Label>Selecciona un Equipo</Form.Label>
          <Form.Control as="select" value={selectedEquipo} onChange={handleEquipoChange}>
            <option value="">Selecciona un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
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
            <tr key={partido.partido_id}>
              <td>{partido.partido_id}</td>
              <td>{partido.equipo_local}</td>
              <td>{partido.equipo_visitante}</td>
              <td>{partido.fecha_partido}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PartidosPorEquipo;
