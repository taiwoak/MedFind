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
      console.log('Login successful');
      navigate('/profile'); // Redirect to Add Health Center page after login
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' id='sign-up'>
      <h3>Hi there 👋, Welcome back!</h3>
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
