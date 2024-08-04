// src/components/Consultas/PartidosGanadosEquipo.js

import React, { useState, useEffect } from 'react';
import equipoService from '../../services/equipoService';
import { Table, Form, Button } from 'react-bootstrap';

const PartidosGanadosEquipo = () => {
  const [equipos, setEquipos] = useState([]);
  const [totalGanados, setTotalGanados] = useState(null);
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

  const handleBuscarGanados = async () => {
    if (selectedEquipo) {
      try {
        const data = await equipoService.getPartidosGanadosPorEquipo(selectedEquipo);
        setTotalGanados(data.total_partidos_ganados); // Asegúrate de acceder a la propiedad correcta
      } catch (error) {
        console.error('Error fetching total de partidos ganados por equipo:', error);
      }
    } else {
      setTotalGanados(null);
    }
  };

  return (
    <div>
      <h1>Partidos Ganados por Equipo</h1>
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
        <Button variant="primary" onClick={handleBuscarGanados}>Buscar Partidos Ganados</Button>
      </Form>
      {totalGanados !== null && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Total de Partidos Ganados</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalGanados}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PartidosGanadosEquipo;
