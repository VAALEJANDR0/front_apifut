// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/inicio">Torneo Futbol</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/equipos">Equipos</Nav.Link>
          <Nav.Link as={Link} to="/jugadores">Jugadores</Nav.Link>
          <Nav.Link as={Link} to="/partidos">Partidos</Nav.Link>
          <Nav.Link as={Link} to="/resultados">Resultados</Nav.Link>
          <NavDropdown title="Consultas" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/consultas/jugadores-por-equipo">Jugadores por Equipo</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/resultados-por-partido">Resultados por Partido</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/jugadores-por-posicion">Jugadores por Posición</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/historial-partidos-entre-equipos">Historial de Partidos entre Equipos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/total-goles-equipo">Total de Goles por Equipo</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/partidos-ganados-equipo">Partidos Ganados por Equipo</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/historial-resultados-equipo">Historial de Resultados del Equipo</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/detalles-jugador">Detalles del Jugador</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/proximo-partido-equipo">Próximo Partido del Equipo</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/jugadores-con-equipo">Jugadores con Equipo</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/detalles-partido">Detalles del Partido</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/partidos-por-equipo">Partidos por Equipo</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/resultados-por-equipo">Resultados por Equipo</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas/rendimiento-equipo">Rendimiento del Equipo</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
