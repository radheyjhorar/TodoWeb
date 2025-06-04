import { useState } from 'react';
import authService from '../services/authService';
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Register = ({ onRegister }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await authService.register(name, email, password);
    if (user) {
      // onRegister(user);
      // console.log("user: ",user.user);
      // console.log("token: ",user.token);
      login(user.user, user.token);
      navigate("/home");
    } else {
      console.log('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type='text' placeholder='Name' value={name} onChange={e=>setName(e.target.value)} required />
      <input type='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type='submit'>Register</button>
      <NavLink to={'/login'}>Login</NavLink>
    </form>
  );
};

export default Register;