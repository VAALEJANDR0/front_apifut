// src/components/Consultas/RendimientoPorEquipo.js

import React, { useEffect, useState } from 'react';
import equipoService from '../../services/equipoService';
import { Form, Button, Table } from 'react-bootstrap';

const RendimientoPorEquipo = () => {
  const [equipos, setEquipos] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState('');
  const [rendimiento, setRendimiento] = useState(null);

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

  const handleBuscarRendimiento = async () => {
    if (selectedEquipo) {
      try {
        const data = await equipoService.getRendimientoPorEquipo(selectedEquipo);
        setRendimiento(data);
      } catch (error) {
        console.error('Error fetching rendimiento:', error);
        setRendimiento(null);
      }
    } else {
      setRendimiento(null);
    }
  };

  return (
    <div>
      <h1>Rendimiento por Equipo</h1>
      <Form>
        <Form.Group controlId="formEquipoSelect">
          <Form.Label>Selecciona un Equipo</Form.Label>
          <Form.Control
            as="select"
            value={selectedEquipo}
            onChange={(e) => setSelectedEquipo(e.target.value)}
          >
            <option value="">Selecciona un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleBuscarRendimiento}>
          Buscar Rendimiento
        </Button>
      </Form>
      {rendimiento && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Victorias</th>
              <th>Empates</th>
              <th>Derrotas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{rendimiento.victorias}</td>
              <td>{rendimiento.empates}</td>
              <td>{rendimiento.derrotas}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RendimientoPorEquipo;
