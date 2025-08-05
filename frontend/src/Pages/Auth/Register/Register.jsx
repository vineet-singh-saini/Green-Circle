import { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', bio: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://green-circle-backend.onrender.com/auth/register', form);
    alert('You Have Been Successfully Registered');
    navigate('/login');
  };

  return (
    <div className="register-div">
      <div className="register">
        <div className="register-left">
          <h2>Join GreenCircle - Professional Social App</h2>
          <p>Connect with professionals, share your knowledge, and build your digital presence.</p>
         
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>

        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              name='name'
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Email"
              name='email'
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name='password'
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <input
              placeholder="Short Bio"
              name='bio'
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
