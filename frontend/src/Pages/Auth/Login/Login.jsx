import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://green-circle-backend.onrender.com/auth/login', formData);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
      alert('Login failed');
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='login-left'>
          <p>Welcome Back!</p>
          <span>Log in to access your professional community, connect with others, and grow your network.</span>
        </div>
        <form className='login-form' onSubmit={submitHandler}>
          <input
            type='text'
            name='email'
            className='login-input'
            placeholder='Enter Email'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type='password'
            name='password'
            className='login-input'
            placeholder='Enter Password'
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type='submit' className='login-button'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
