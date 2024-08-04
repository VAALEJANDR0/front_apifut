// src/services/partidoService.js

import axiosInstance from '../axiosConfig';

const getPartidos = async () => {
  try {
    const response = await axiosInstance.get('/partidos');
    return response.data;
  } catch (error) {
    console.error('Error fetching partidos:', error);
    throw error;
  }
};

const addPartido = async (partido) => {
  try {
    const response = await axiosInstance.post('/partidos', partido);
    return response.data;
  } catch (error) {
    console.error('Error adding partido:', error);
    throw error;
  }
};

const updatePartido = async (id, partido) => {
  try {
    const response = await axiosInstance.put(`/partidos/${id}`, partido);
    return response.data;
  } catch (error) {
    console.error('Error updating partido:', error);
    throw error;
  }
};

const deletePartido = async (id) => {
  try {
    const response = await axiosInstance.delete(`/partidos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting partido:', error);
    throw error;
  }
};

const getPartidosPorEquipo = async (equipoId) => {
  try {
    const response = await axiosInstance.get(`/equipos/${equipoId}/partidos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching partidos por equipo:', error);
    throw error;
  }
};

const getHistorialPartidosEntreEquipos = async (equipo1Id, equipo2Id) => {
  try {
    const response = await axiosInstance.get(`/partidos/equipos/${equipo1Id}/${equipo2Id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historial de partidos entre equipos:', error);
    throw error;
  }
};

const getPartidoDetalles = async (partidoId) => {
  try {
    const response = await axiosInstance.get(`/partidos/${partidoId}/detalles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching detalles del partido:', error);
    throw error;
  }
};

export default {
  getPartidos,
  addPartido,
  updatePartido,
  deletePartido,
  getPartidosPorEquipo,
  getHistorialPartidosEntreEquipos,
  getPartidoDetalles,

};
