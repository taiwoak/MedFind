import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login button clicked');
    console.log('Email:', email);
    console.log('Password:', password ? '•••••••' : '(empty)');
    try {
      console.log('Attempting login...');
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
      navigate('/'); // Redirect to Home page after login
    } catch (error) {
      if (error instanceof Error) {
        alert(`Login failed: Invalid credentials. Please try again.`);
        console.error(error.message);
      } else {
        alert('Login failed: An unknown error occurred');
        console.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' id='sign-up'>
      <h3>Hi Medfinder, Welcome back!</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to='/signup' style={{ color: '#198754' }}>Sign up</Link></p>
      <p>Copyright © 2024 MedFind, Inc. All Rights Reserved.</p>
    </div>
  );
};

export default Login;
