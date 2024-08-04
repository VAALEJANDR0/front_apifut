// src/components/Inicio.js

import React from 'react';
import { Container, Table } from 'react-bootstrap';

const Inicio = () => {
  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <img 
      src="/logo_UDB.png" 
      alt="lOGO-UDB" 
      className="img-fluid mb-4"
      style={{ maxWidth: '300px', height: 'auto' }} 
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Carnet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Roberto Alejandro</td>
            <td>Ventura Alvarenga</td>
            <td>VA210756</td>
          </tr>
          <tr>
            <td>Marlon David</td>
            <td>Martinez Montoya</td>
            <td>MM210981</td>
          </tr>
          <tr>
            <td>Karla Elizabeth</td>
            <td>Murillo Urrutia</td>
            <td>MU192557</td>
          </tr>
          <tr>
            <td>Gabriela Lourdes</td>
            <td>Rodríguez Parada</td>
            <td>RP210191</td>
          </tr>
          <tr>
            <td>Jessica Abigail</td>
            <td>Rodríguez Torres</td>
            <td>RT200479</td>
          </tr>

        </tbody>
      </Table>
    </Container>
  );
};

export default Inicio;
