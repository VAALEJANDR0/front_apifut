// src/components/Consultas/DetallesPartido.js

import React, { useState, useEffect } from 'react';
import partidoService from '../../services/partidoService';
import equipoService from '../../services/equipoService';
import { Form, Button, Card } from 'react-bootstrap';

const DetallesPartido = () => {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [selectedPartido, setSelectedPartido] = useState('');
  const [partidoDetalles, setPartidoDetalles] = useState(null);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const data = await partidoService.getPartidos();
        setPartidos(data);
      } catch (error) {
        console.error('Error fetching partidos:', error);
      }
    };

    const fetchEquipos = async () => {
      try {
        const data = await equipoService.getEquipos();
        setEquipos(data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      }
    };

    fetchPartidos();
    fetchEquipos();
  }, []);

  const handleBuscarDetalles = async () => {
    if (selectedPartido) {
      try {
        const data = await partidoService.getPartidoDetalles(selectedPartido);
        setPartidoDetalles(data);
      } catch (error) {
        console.error('Error fetching detalles del partido:', error);
        setPartidoDetalles(null);
      }
    } else {
      setPartidoDetalles(null);
    }
  };

  const getEquipoNombre = (equipoId) => {
    const equipo = equipos.find(equipo => equipo.id === equipoId);
    return equipo ? equipo.nombre : 'Desconocido';
  };

  return (
    <div>
      <h1>Detalles del Partido</h1>
      <Form>
        <Form.Group controlId="formPartidoSelect">
          <Form.Label>Selecciona un Partido</Form.Label>
          <Form.Control as="select" value={selectedPartido} onChange={(e) => setSelectedPartido(e.target.value)}>
            <option value="">Selecciona un partido</option>
            {partidos.map((partido) => (
              <option key={partido.id} value={partido.id}>
                {`${getEquipoNombre(partido.equipo_local_id)} vs ${getEquipoNombre(partido.equipo_visitante_id)}`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleBuscarDetalles}>
          Buscar Detalles
        </Button>
      </Form>
      {partidoDetalles && (
        <Card className="mt-3">
          <Card.Header>Detalles del Partido</Card.Header>
          <Card.Body>
            <Card.Title>{partidoDetalles.equipo_local} vs {partidoDetalles.equipo_visitante}</Card.Title>
            <Card.Text>
              <strong>Fecha del Partido:</strong> {partidoDetalles.fecha_partido}<br />
              <strong>Puntaje Equipo Local:</strong> {partidoDetalles.puntaje_equipo_local}<br />
              <strong>Puntaje Equipo Visitante:</strong> {partidoDetalles.puntaje_equipo_visitante}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default DetallesPartido;
