import axios from "axios";
const API_URL = 'http://localhost:1212/api/todos';

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
})

const getTodos = async (token) => {
  try {
    const res = await axios.get(API_URL, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log(error.response.data.message);
    } else if (error.request) {
      console.log("Network error: No response received from server.", error.response.data.message);
    } else {
      console.log("An unexpected error occurred. Please try again.", error.response.data.message);
    }
  }
};

const createTodo = async (todo, token) => {
  const res = await axios.post(API_URL, todo, getAuthHeaders(token));
  return res.data;
}

const updateTodo = async (id, updates, token) => {
  const res = await axios.put(`${API_URL}/${id}`, updates, getAuthHeaders(token));
  return res.data;
}

const deleteTodo = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders(token));
  return res.data;
}

export default {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
}