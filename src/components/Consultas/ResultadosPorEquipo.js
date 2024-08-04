// src/components/Consultas/ResultadosPorEquipo.js

import React, { useEffect, useState } from 'react';
import equipoService from '../../services/equipoService';
import resultadoService from '../../services/resultadoService';
import { Form, Button, Table } from 'react-bootstrap';

const ResultadosPorEquipo = () => {
  const [equipos, setEquipos] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState('');
  const [resultados, setResultados] = useState([]);

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

  const handleBuscarResultados = async () => {
    if (selectedEquipo) {
      try {
        const data = await resultadoService.getResultadosPorEquipo(selectedEquipo);
        setResultados(data);
      } catch (error) {
        console.error('Error fetching resultados:', error);
        setResultados([]);
      }
    } else {
      setResultados([]);
    }
  };

  return (
    <div>
      <h1>Resultados por Equipo</h1>
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
        <Button variant="primary" onClick={handleBuscarResultados}>
          Buscar Resultados
        </Button>
      </Form>
      {resultados.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Partido</th>
              <th>Puntaje Equipo Local</th>
              <th>Puntaje Equipo Visitante</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado) => (
              <tr key={resultado.partido_id}>
                <td>{resultado.partido_id}</td>
                <td>{`${resultado.equipo_local} vs ${resultado.equipo_visitante}`}</td>
                <td>{resultado.puntaje_equipo_local}</td>
                <td>{resultado.puntaje_equipo_visitante}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ResultadosPorEquipo;
