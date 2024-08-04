// src/services/equipoService.js

import axiosInstance from '../axiosConfig';

const getEquipos = async () => {
  try {
    const response = await axiosInstance.get('/equipos');
    return response.data;
  } catch (error) {
    console.error('Error fetching equipos:', error);
    throw error;
  }
};

const addEquipo = async (equipo) => {
  try {
    const response = await axiosInstance.post('/equipos', equipo);
    return response.data;
  } catch (error) {
    console.error('Error adding equipo:', error);
    throw error;
  }
};

const updateEquipo = async (id, equipo) => {
  try {
    const response = await axiosInstance.put(`/equipos/${id}`, equipo);
    return response.data;
  } catch (error) {
    console.error('Error updating equipo:', error);
    throw error;
  }
};

const deleteEquipo = async (id) => {
  try {
    const response = await axiosInstance.delete(`/equipos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting equipo:', error);
    throw error;
  }
};

const getTotalGolesPorEquipo = async (equipoId) => {
  try {
    const response = await axiosInstance.get(`/equipos/${equipoId}/goles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total de goles por equipo:', error);
    throw error;
  }
};

const getPartidosGanadosPorEquipo = async (equipoId) => {
  try {
    const response = await axiosInstance.get(`/equipos/${equipoId}/partidos-ganados`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total de partidos ganados por equipo:', error);
    throw error;
  }
};

const getHistorialResultadosPorEquipo = async (equipoId) => {
  try {
    const response = await axiosInstance.get(`/equipos/${equipoId}/historial-resultados`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historial de resultados por equipo:', error);
    throw error;
  }
};

const getProximoPartido = async (equipoId) => {
  try {
    const response = await axiosInstance.get(`/equipos/${equipoId}/proximo-partido`);
    return response.data;
  } catch (error) {
    console.error('Error fetching próximo partido del equipo:', error);
    throw error;
  }
};

const getRendimientoPorEquipo = async (equipoId) => {
  try {
    const response = await axiosInstance.get(`/equipos/${equipoId}/rendimiento`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rendimiento por equipo:', error);
    throw error;
  }
};

export default {
  getEquipos,
  addEquipo,
  updateEquipo,
  deleteEquipo,
  getTotalGolesPorEquipo,
  getPartidosGanadosPorEquipo,
  getHistorialResultadosPorEquipo,
  getProximoPartido,
  getRendimientoPorEquipo,
};
