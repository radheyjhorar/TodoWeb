import axios from 'axios';

const plainAxios = axios.create({
  baseURL: 'http://localhost:1212/api',
});

export default plainAxios;