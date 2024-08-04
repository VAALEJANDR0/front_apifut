// src/components/Consultas/DetallesJugador.js

import React, { useState, useEffect } from 'react';
import jugadorService from '../../services/jugadorService';
import { Form, Button, Card } from 'react-bootstrap';

const DetallesJugador = () => {
  const [jugadores, setJugadores] = useState([]);
  const [jugadorId, setJugadorId] = useState('');
  const [jugadorDetalles, setJugadorDetalles] = useState(null);

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const data = await jugadorService.getJugadores();
        setJugadores(data);
      } catch (error) {
        console.error('Error fetching jugadores:', error);
      }
    };

    fetchJugadores();
  }, []);

  const handleBuscarDetalles = async () => {
    if (jugadorId) {
      try {
        const data = await jugadorService.getJugadorDetalles(jugadorId);
        setJugadorDetalles(data);
      } catch (error) {
        console.error('Error fetching detalles del jugador:', error);
        setJugadorDetalles(null);
      }
    } else {
      setJugadorDetalles(null);
    }
  };

  return (
    <div>
      <h1>Detalles del Jugador</h1>
      <Form>
        <Form.Group controlId="formJugadorSelect">
          <Form.Label>Selecciona un Jugador</Form.Label>
          <Form.Control as="select" value={jugadorId} onChange={(e) => setJugadorId(e.target.value)}>
            <option value="">Selecciona un jugador</option>
            {jugadores.map((jugador) => (
              <option key={jugador.id} value={jugador.id}>{jugador.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleBuscarDetalles}>
          Buscar Detalles
        </Button>
      </Form>
      {jugadorDetalles && (
        <Card className="mt-3">
          <Card.Header>{jugadorDetalles.nombre}</Card.Header>
          <Card.Body>
            <Card.Title>Detalles del Jugador</Card.Title>
            <Card.Text>
              <strong>ID:</strong> {jugadorDetalles.id}<br />
              <strong>Nombre:</strong> {jugadorDetalles.nombre}<br />
              <strong>Número:</strong> {jugadorDetalles.numero}<br />
              <strong>Posición:</strong> {jugadorDetalles.posicion}<br />
              <strong>Equipo:</strong> {jugadorDetalles.equipo.nombre}<br />
              <strong>Entrenador:</strong> {jugadorDetalles.equipo.entrenador}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default DetallesJugador;
