// src/components/PartidosList.js

import React, { useEffect, useState } from 'react';
import partidoService from '../services/partidoService';
import equipoService from '../services/equipoService';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const PartidosList = () => {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPartido, setCurrentPartido] = useState({ id: null, equipo_local_id: '', equipo_visitante_id: '', fecha_partido: '' });

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

  const handleEdit = (partido) => {
    setCurrentPartido(partido);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await partidoService.deletePartido(id);
      setPartidos(partidos.filter(partido => partido.id !== id));
      window.location.reload();  // Recargar la página después de eliminar
    } catch (error) {
      console.error('Error deleting partido:', error);
    }
  };

  const handleAdd = () => {
    setCurrentPartido({ id: null, equipo_local_id: '', equipo_visitante_id: '', fecha_partido: '' });
    setShow(true);
  };

  const handleSave = async () => {
    try {
      if (currentPartido.id) {
        // Editar partido existente
        await partidoService.updatePartido(currentPartido.id, currentPartido);
      } else {
        // Agregar nuevo partido
        await partidoService.addPartido(currentPartido);
      }
      setShow(false);
      window.location.reload();  // Recargar la página después de guardar
    } catch (error) {
      console.error('Error saving partido:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPartido(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getEquipoNombre = (equipoId) => {
    const equipo = equipos.find(equipo => equipo.id === equipoId);
    return equipo ? equipo.nombre : '';
  };

  return (
    <div>
      <h1>Lista de Partidos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Equipo Local</th>
            <th>Equipo Visitante</th>
            <th>Fecha del Partido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map((partido) => (
            <tr key={partido.id}>
              <td>{partido.id}</td>
              <td>{getEquipoNombre(partido.equipo_local_id)}</td>
              <td>{getEquipoNombre(partido.equipo_visitante_id)}</td>
              <td>{partido.fecha_partido}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(partido)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(partido.id)}>Borrar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleAdd}>Agregar Partido</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPartido.id ? 'Editar Partido' : 'Agregar Partido'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEquipoLocal">
              <Form.Label>Equipo Local</Form.Label>
              <Form.Control
                as="select"
                name="equipo_local_id"
                value={currentPartido.equipo_local_id}
                onChange={handleChange}
              >
                <option value="">Selecciona un equipo</option>
                {equipos.map((equipo) => (
                  <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formEquipoVisitante">
              <Form.Label>Equipo Visitante</Form.Label>
              <Form.Control
                as="select"
                name="equipo_visitante_id"
                value={currentPartido.equipo_visitante_id}
                onChange={handleChange}
              >
                <option value="">Selecciona un equipo</option>
                {equipos.map((equipo) => (
                  <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFechaPartido">
              <Form.Label>Fecha del Partido</Form.Label>
              <Form.Control
                type="datetime-local"
                name="fecha_partido"
                value={currentPartido.fecha_partido}
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

export default PartidosList;
