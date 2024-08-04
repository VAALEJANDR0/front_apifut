// src/components/ResultadosList.js

import React, { useEffect, useState } from 'react';
import resultadoService from '../services/resultadoService';
import partidoService from '../services/partidoService';
import equipoService from '../services/equipoService';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ResultadosList = () => {
  const [resultados, setResultados] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [show, setShow] = useState(false);
  const [currentResultado, setCurrentResultado] = useState({ id: null, partido_id: '', puntaje_equipo_local: '', puntaje_equipo_visitante: '' });

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const data = await resultadoService.getResultados();
        setResultados(data);
      } catch (error) {
        console.error('Error fetching resultados:', error);
      }
    };

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

    fetchResultados();
    fetchPartidos();
    fetchEquipos();
  }, []);

  const handleEdit = (resultado) => {
    setCurrentResultado(resultado);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await resultadoService.deleteResultado(id);
      setResultados(resultados.filter(resultado => resultado.id !== id));
    } catch (error) {
      console.error('Error deleting resultado:', error);
    }
  };

  const handleAdd = () => {
    setCurrentResultado({ id: null, partido_id: '', puntaje_equipo_local: '', puntaje_equipo_visitante: '' });
    setShow(true);
  };

  const handleSave = async () => {
    try {
      if (currentResultado.id) {
        // Editar resultado existente
        const updatedResultado = await resultadoService.updateResultado(currentResultado.id, currentResultado);
        setResultados(resultados.map(resultado => (resultado.id === updatedResultado.id ? updatedResultado : resultado)));
      } else {
        // Agregar nuevo resultado
        const newResultado = await resultadoService.addResultado(currentResultado);
        setResultados([...resultados, newResultado]);
      }
      setShow(false);
      window.location.reload();  // Recargar la página después de guardar
    } catch (error) {
      console.error('Error saving resultado:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentResultado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getEquipoNombre = (equipoId) => {
    const equipo = equipos.find(equipo => equipo.id === equipoId);
    return equipo ? equipo.nombre : '';
  };

  const getPartidoDescripcion = (partidoId) => {
    const partido = partidos.find(partido => partido.id === partidoId);
    if (partido) {
      const local = getEquipoNombre(partido.equipo_local_id);
      const visitante = getEquipoNombre(partido.equipo_visitante_id);
      return `${local} vs ${visitante}`;
    }
    return '';
  };

  return (
    <div>
      <h1>Lista de Resultados</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Partido</th>
            <th>Puntaje Equipo Local</th>
            <th>Puntaje Equipo Visitante</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((resultado) => (
            <tr key={resultado.id}>
              <td>{resultado.id}</td>
              <td>{getPartidoDescripcion(resultado.partido_id)}</td>
              <td>{resultado.puntaje_equipo_local}</td>
              <td>{resultado.puntaje_equipo_visitante}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(resultado)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(resultado.id)}>Borrar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleAdd}>Agregar Resultado</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentResultado.id ? 'Editar Resultado' : 'Agregar Resultado'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPartido">
              <Form.Label>Partido</Form.Label>
              <Form.Control
                as="select"
                name="partido_id"
                value={currentResultado.partido_id}
                onChange={handleChange}
              >
                <option value="">Selecciona un partido</option>
                {partidos.map((partido) => (
                  <option key={partido.id} value={partido.id}>
                    {`${partido.id} - ${getEquipoNombre(partido.equipo_local_id)} vs ${getEquipoNombre(partido.equipo_visitante_id)}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPuntajeEquipoLocal">
              <Form.Label>Puntaje Equipo Local</Form.Label>
              <Form.Control
                type="number"
                name="puntaje_equipo_local"
                value={currentResultado.puntaje_equipo_local}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPuntajeEquipoVisitante">
              <Form.Label>Puntaje Equipo Visitante</Form.Label>
              <Form.Control
                type="number"
                name="puntaje_equipo_visitante"
                value={currentResultado.puntaje_equipo_visitante}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResultadosList;
