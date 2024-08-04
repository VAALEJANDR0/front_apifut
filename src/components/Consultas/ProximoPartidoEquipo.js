// src/components/Consultas/ProximoPartidoEquipo.js

import React, { useState, useEffect } from 'react';
import equipoService from '../../services/equipoService';
import { Form, Button, Card } from 'react-bootstrap';

const ProximoPartidoEquipo = () => {
  const [equipos, setEquipos] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState('');
  const [partido, setPartido] = useState(null);

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

  const handleBuscarPartido = async () => {
    if (selectedEquipo) {
      try {
        const data = await equipoService.getProximoPartido(selectedEquipo);
        setPartido(data);
      } catch (error) {
        console.error('Error fetching próximo partido del equipo:', error);
        setPartido(null);
      }
    } else {
      setPartido(null);
    }
  };

  return (
    <div>
      <h1>Próximo Partido del Equipo</h1>
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
        <Button variant="primary" onClick={handleBuscarPartido}>
          Buscar Partido
        </Button>
      </Form>
      {partido && (
        <Card className="mt-3">
          <Card.Header>Próximo Partido</Card.Header>
          <Card.Body>
            <Card.Title>{partido.equipo_local.nombre} vs {partido.equipo_visitante.nombre}</Card.Title>
            <Card.Text>
              <strong>Fecha del Partido:</strong> {partido.fecha_partido}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ProximoPartidoEquipo;
