// src/components/Consultas/JugadoresPorEquipo.js

import React, { useState, useEffect } from 'react';
import jugadorService from '../../services/jugadorService';
import equipoService from '../../services/equipoService';
import { Table, Form, Button } from 'react-bootstrap';

const JugadoresPorEquipo = () => {
  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
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
        const data = await jugadorService.getJugadoresPorEquipo(equipoId);
        setJugadores(data);
      } catch (error) {
        console.error('Error fetching jugadores:', error);
      }
    } else {
      setJugadores([]);
    }
  };

  return (
    <div>
      <h1>Jugadores por Equipo</h1>
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
            <th>Nombre</th>
            <th>Número</th>
            <th>Posición</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((jugador) => (
            <tr key={jugador.id}>
              <td>{jugador.id}</td>
              <td>{jugador.nombre}</td>
              <td>{jugador.numero}</td>
              <td>{jugador.posicion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default JugadoresPorEquipo;
