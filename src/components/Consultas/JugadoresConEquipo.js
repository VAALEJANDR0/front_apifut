// src/components/Consultas/JugadoresConEquipo.js

import React, { useState, useEffect } from 'react';
import jugadorService from '../../services/jugadorService';
import { Table } from 'react-bootstrap';

const JugadoresConEquipo = () => {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchJugadoresConEquipos = async () => {
      try {
        const data = await jugadorService.getJugadoresConEquipos();
        setJugadores(data);
      } catch (error) {
        console.error('Error fetching jugadores con equipos:', error);
      }
    };

    fetchJugadoresConEquipos();
  }, []);

  return (
    <div>
      <h1>Jugadores con Equipo</h1>
      {jugadores.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Número</th>
              <th>Posición</th>
              <th>Equipo</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((jugador, index) => (
              <tr key={index}>
                <td>{jugador.jugador}</td>
                <td>{jugador.numero}</td>
                <td>{jugador.posicion}</td>
                <td>{jugador.equipo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default JugadoresConEquipo;
