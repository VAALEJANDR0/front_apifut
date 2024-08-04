// src/components/EquiposList.js

import React, { useEffect, useState } from 'react';
import equipoService from '../services/equipoService';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const EquiposList = () => {
  const [equipos, setEquipos] = useState([]);
  const [show, setShow] = useState(false);
  const [currentEquipo, setCurrentEquipo] = useState({ id: null, nombre: '', entrenador: '' });

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

  const handleEdit = (equipo) => {
    setCurrentEquipo(equipo);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await equipoService.deleteEquipo(id);
      setEquipos(equipos.filter(equipo => equipo.id !== id));
    } catch (error) {
      console.error('Error deleting equipo:', error);
    }
  };

  const handleAdd = () => {
    setCurrentEquipo({ id: null, nombre: '', entrenador: '' });
    setShow(true);
  };

  const handleSave = async () => {
    try {
      if (currentEquipo.id) {
        // Editar equipo existente
        const updatedEquipo = await equipoService.updateEquipo(currentEquipo.id, currentEquipo);
        setEquipos(equipos.map(equipo => (equipo.id === updatedEquipo.id ? updatedEquipo : equipo)));
      } else {
        // Agregar nuevo equipo
        const newEquipo = await equipoService.addEquipo(currentEquipo);
        setEquipos([...equipos, newEquipo]);
      }
      setShow(false);
    } catch (error) {
      console.error('Error saving equipo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEquipo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Lista de Equipos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Entrenador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.id}>
              <td>{equipo.id}</td>
              <td>{equipo.nombre}</td>
              <td>{equipo.entrenador}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(equipo)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(equipo.id)}>Borrar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleAdd}>Agregar Equipo</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEquipo.id ? 'Editar Equipo' : 'Agregar Equipo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={currentEquipo.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEntrenador">
              <Form.Label>Entrenador</Form.Label>
              <Form.Control
                type="text"
                name="entrenador"
                value={currentEquipo.entrenador}
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

export default EquiposList;
