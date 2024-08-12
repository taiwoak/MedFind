import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './medfind.css';
import icon from '../assets/iconoir--profile-circle.svg'
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignOutButton from './SignOutButton';


const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <nav className='d-flex flex-row align-items-center justify-content-between' id='nav'>
        <div>
            <Link to ="/"><h2>MED<span style={{ color: '#ffffff' }}>FIND</span></h2></Link>
        </div>
        <div className='d-flex flex-row align-items-center justify-content-around' id='nav-links'>
          <Link to="/"><p>Home</p></Link>
          <Link to="/about"><p>About</p></Link>
          <Link to="/contact"><p>Contact</p></Link>
          <Link to="/search"><p>Search</p></Link>
        </div>
        <div>
          {user ? (<div className='d-flex flex-row align-items-center justify-content-center' id='nav-profile'>
            <Link to="/profile">
              <img src={user.photoURL || icon } alt="Profile"/>
            </Link>
            <SignOutButton />
            </div>
          ) : (
            <div className='d-flex flex-row align-items-center justify-content-center' id='nav-auth'>
              <Link to="/signup"><button className='nav-btn'>Sign Up</button></Link>
              <Link to="/login"><button className='nav-btn'>Login</button></Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar