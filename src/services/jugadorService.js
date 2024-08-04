// src/services/jugadorService.js

import axiosInstance from '../axiosConfig';

const getJugadores = async () => {
  try {
    const response = await axiosInstance.get('/jugadores');
    return response.data;
  } catch (error) {
    console.error('Error fetching jugadores:', error);
    throw error;
  }
};

const addJugador = async (jugador) => {
  try {
    const response = await axiosInstance.post('/jugadores', jugador);
    return response.data;
  } catch (error) {
    console.error('Error adding jugador:', error);
    throw error;
  }
};

const updateJugador = async (id, jugador) => {
  try {
    const response = await axiosInstance.put(`/jugadores/${id}`, jugador);
    return response.data;
  } catch (error) {
    console.error('Error updating jugador:', error);
    throw error;
  }
};

const deleteJugador = async (id) => {
  try {
    const response = await axiosInstance.delete(`/jugadores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting jugador:', error);
    throw error;
  }
};

const getJugadoresPorEquipo = async (equipoId) => {
  try {
    const response = await axiosInstance.get(`/equipos/${equipoId}/jugadores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jugadores por equipo:', error);
    throw error;
  }
};

const getJugadoresPorEquipoYPosicion = async (equipoId, posicion) => {
  try {
    const response = await axiosInstance.get(`/equipos/${equipoId}/jugadores/posicion/${posicion}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jugadores por equipo y posición:', error);
    throw error;
  }
};

const getJugadorDetalles = async (jugadorId) => {
  try {
    const response = await axiosInstance.get(`/jugadores/${jugadorId}/detalles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching detalles del jugador:', error);
    throw error;
  }
};

const getJugadoresConEquipos = async () => {
  try {
    const response = await axiosInstance.get('/jugadores-con-equipos');
    return response.data;
  } catch (error) {
    console.error('Error fetching jugadores con equipos:', error);
    throw error;
  }
};

export default {
  getJugadores,
  addJugador,
  updateJugador,
  deleteJugador,
  getJugadoresPorEquipo,
  getJugadoresPorEquipoYPosicion,
  getJugadorDetalles,
  getJugadoresConEquipos,
};
