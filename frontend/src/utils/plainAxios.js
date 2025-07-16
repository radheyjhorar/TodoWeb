import axios from 'axios';

const plainAxios = axios.create({
  baseURL: 'https://todowebbackend.onrender.com/api',
});

export default plainAxios;