import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const API_URL = 'http://localhost:1212/api/todos';

// const getAuthHeader = () => {
//  const user = JSON.parse(localStorage.getItem('user'));
//  return { Authorization: `Bearer ${user?.token}` };
// }

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
})

const getTodos = async (token) => {
  try {
    const res = await axios.get(API_URL, getAuthHeaders(token));
    return res.data;
  } catch (err) {
    useNavigate('/login')
    console.error('Unauthorized or invailid token', err);
    // throw err;
  }
};

const createTodo = async (todo, token) => {
  const res = await axios.post(API_URL, todo, getAuthHeaders(token));
  return res.data;
}

const updateTodo = async (id, updates) => {
  const res = await axios.put(`${API_URL}/${id}`, updates);
  return res.data;
}

const deleteTodo = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}

export default {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
}