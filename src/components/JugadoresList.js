// src/components/JugadoresList.js

import React, { useEffect, useState } from 'react';
import jugadorService from '../services/jugadorService';
import equipoService from '../services/equipoService';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const JugadoresList = () => {
  const [jugadores, setJugadores] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [show, setShow] = useState(false);
  const [currentJugador, setCurrentJugador] = useState({ id: null, equipo_id: '', nombre: '', numero: '', posicion: '' });

  const posiciones = [
    "Portero",
    "Defensa central",
    "Defensa lateral",
    "Mediocentro",
    "Mediapunta",
    "Extremo izquierdo",
    "Extremo derecho",
    "Delantero"
  ];

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const data = await jugadorService.getJugadores();
        setJugadores(data);
      } catch (error) {
        console.error('Error fetching jugadores:', error);
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

    fetchJugadores();
    fetchEquipos();
  }, []);

  const handleEdit = (jugador) => {
    setCurrentJugador(jugador);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await jugadorService.deleteJugador(id);
      setJugadores(jugadores.filter(jugador => jugador.id !== id));
      window.location.reload();  // Recargar la página después de eliminar
    } catch (error) {
      console.error('Error deleting jugador:', error);
    }
  };

  const handleAdd = () => {
    setCurrentJugador({ id: null, equipo_id: '', nombre: '', numero: '', posicion: '' });
    setShow(true);
  };

  const handleSave = async () => {
    try {
      if (currentJugador.id) {
        // Editar jugador existente
        await jugadorService.updateJugador(currentJugador.id, currentJugador);
      } else {
        // Agregar nuevo jugador
        await jugadorService.addJugador(currentJugador);
      }
      setShow(false);
      window.location.reload();  // Recargar la página después de guardar
    } catch (error) {
      console.error('Error saving jugador:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentJugador(prevState => ({
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
      <h1>Lista de Jugadores</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Equipo</th>
            <th>Nombre</th>
            <th>Número</th>
            <th>Posición</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((jugador) => (
            <tr key={jugador.id}>
              <td>{jugador.id}</td>
              <td>{getEquipoNombre(jugador.equipo_id)}</td>
              <td>{jugador.nombre}</td>
              <td>{jugador.numero}</td>
              <td>{jugador.posicion}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(jugador)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(jugador.id)}>Borrar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleAdd}>Agregar Jugador</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentJugador.id ? 'Editar Jugador' : 'Agregar Jugador'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEquipoID">
              <Form.Label>Equipo</Form.Label>
              <Form.Control
                as="select"
                name="equipo_id"
                value={currentJugador.equipo_id}
                onChange={handleChange}
              >
                <option value="">Selecciona un equipo</option>
                {equipos.map((equipo) => (
                  <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={currentJugador.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formNumero">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={currentJugador.numero}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPosicion">
              <Form.Label>Posición</Form.Label>
              <Form.Control
                as="select"
                name="posicion"
                value={currentJugador.posicion}
                onChange={handleChange}
              >
                <option value="">Selecciona una posición</option>
                {posiciones.map((posicion, index) => (
                  <option key={index} value={posicion}>{posicion}</option>
                ))}
              </Form.Control>
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

export default JugadoresList;
