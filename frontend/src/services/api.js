import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Connection error';
    const errors = error.response?.data?.errors || null;
    
    return Promise.reject({
      message,
      status: error.response?.status,
      errors,
    });
  }
);

export const getTasksAPI = (params) => API.get('/tasks', { params });
export const getTaskByIdAPI = (id) => API.get(`/tasks/${id}`);
export const createTaskAPI = (data) => API.post('/tasks', data);
export const updateTaskAPI = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTaskAPI = (id) => API.delete(`/tasks/${id}`);

export default API;
