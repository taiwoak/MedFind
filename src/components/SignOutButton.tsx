// src/components/SignOutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './medfind.css';

const SignOutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/'); // Redirect to home page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut} className='nav-btn'>
      Sign Out
    </button>
  );
};

export default SignOutButton;
