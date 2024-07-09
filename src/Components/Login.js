import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css';
import loginbg from '../assets/login-bg-1.svg';
import logo from '../assets/Logo.svg';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://techprimebackend-j1hq.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin(); // Call the onLogin function passed as prop to update App state
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      toast.error('Invalid credentials 😌 ');
      console.error(err);
    }
  };

  return (
    <div className="login-container-1">
      <ToastContainer />
      <div className="login-bg-1">
        <img src={loginbg} alt="Background" className="background-img-1" />
      </div>
      <div className='logo-img-1'>
        <img src={logo} alt="Logo" className="login-logo-1" />
        <p>Online Project Management</p>
      </div>
      <div className="login-box-1">
        <h2>Login to get started</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
