import axios from '../utils/axiosInstance';
import plainAxios from '../utils/plainAxios';

const register = async (name, email, password) => {
  const res = await axios.post(`/users/register`, {name, email, password });
  // console.log(res.data.message)
  return res.data;
}

const login = async (email, password) => {
  const res = await plainAxios.post(`/users/login`, { email, password });
  return res.data;
};

export default { login, register };