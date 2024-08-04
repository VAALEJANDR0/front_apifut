// src/components/Consultas/JugadoresPorPosicion.js

import React, { useState, useEffect } from 'react';
import jugadorService from '../../services/jugadorService';
import equipoService from '../../services/equipoService';
import { Table, Form, Button } from 'react-bootstrap';

const JugadoresPorPosicion = () => {
  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState('');
  const [selectedPosicion, setSelectedPosicion] = useState('');

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

  const handleBuscarJugadores = async () => {
    if (selectedEquipo && selectedPosicion) {
      try {
        const data = await jugadorService.getJugadoresPorEquipoYPosicion(selectedEquipo, selectedPosicion);
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
      <h1>Jugadores por Posición</h1>
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
        <Form.Group controlId="formPosicionSelect">
          <Form.Label>Selecciona una Posición</Form.Label>
          <Form.Control as="select" value={selectedPosicion} onChange={(e) => setSelectedPosicion(e.target.value)}>
            <option value="">Selecciona una posición</option>
            <option value="Portero">Portero</option>
            <option value="Defensa central">Defensa central</option>
            <option value="Defensa lateral">Defensa lateral</option>
            <option value="Mediocentro">Mediocentro</option>
            <option value="Mediapunta">Mediapunta</option>
            <option value="Extremo izquierdo">Extremo izquierdo</option>
            <option value="Extremo derecho">Extremo derecho</option>
            <option value="Delantero">Delantero</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleBuscarJugadores}>Buscar Jugadores</Button>
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

export default JugadoresPorPosicion;
