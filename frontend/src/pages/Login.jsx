import { useState } from 'react';
import authService from '../services/authService';
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await authService.login(email, password);
    if(data) {
      // onLogin(data.user);
      login(data.user, data.token)
      navigate('/home');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
      <button type='submit'>Login</button>
      <NavLink to={'/register'}>Register</NavLink>
    </form>
  )
}

export default Login;