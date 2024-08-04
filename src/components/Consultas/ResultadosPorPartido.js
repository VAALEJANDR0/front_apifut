// src/components/Consultas/ResultadosPorPartido.js

import React, { useState, useEffect } from 'react';
import resultadoService from '../../services/resultadoService';
import partidoService from '../../services/partidoService';
import equipoService from '../../services/equipoService';
import { Table, Form } from 'react-bootstrap';

const ResultadosPorPartido = () => {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [selectedPartido, setSelectedPartido] = useState('');

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

  const handlePartidoChange = async (e) => {
    const partidoId = e.target.value;
    setSelectedPartido(partidoId);
    if (partidoId) {
      try {
        const data = await resultadoService.getResultadosPorPartido(partidoId);
        setResultados([data]);
      } catch (error) {
        console.error('Error fetching resultados:', error);
      }
    } else {
      setResultados([]);
    }
  };

  const getEquipoNombre = (equipoId) => {
    const equipo = equipos.find(equipo => equipo.id === equipoId);
    return equipo ? equipo.nombre : '';
  };

  const getPartidoDescripcion = (partido) => {
    if (partido) {
      const local = getEquipoNombre(partido.equipo_local_id);
      const visitante = getEquipoNombre(partido.equipo_visitante_id);
      return `${local} vs ${visitante}`;
    }
    return '';
  };

  return (
    <div>
      <h1>Resultados por Partido</h1>
      <Form>
        <Form.Group controlId="formPartidoSelect">
          <Form.Label>Selecciona un Partido</Form.Label>
          <Form.Control as="select" value={selectedPartido} onChange={handlePartidoChange}>
            <option value="">Selecciona un partido</option>
            {partidos.map((partido) => (
              <option key={partido.id} value={partido.id}>
                {getPartidoDescripcion(partido)}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      <Table striped bordered hover>
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
            <tr key={resultado.id}>
              <td>{resultado.id}</td>
              <td>{getPartidoDescripcion(resultados[0])}</td>
              <td>{resultado.puntaje_equipo_local}</td>
              <td>{resultado.puntaje_equipo_visitante}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResultadosPorPartido;
