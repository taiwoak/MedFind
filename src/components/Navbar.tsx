import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './medfind.css';
import icon from '../assets/iconoir--profile-circle.svg'
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignOutButton from './SignOutButton';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { CiCircleInfo, CiHome, CiLogin, CiLogout, CiMail, CiSearch, CiUser } from "react-icons/ci";
import { PiUserPlusThin, PiUsersThreeThin } from "react-icons/pi";
import SignOut from './SignOut';


const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <div>
      <nav className='d-flex flex-row align-items-center' id='nav'>
        <div>
            <Link to ="/"><h2>MED<span style={{ color: '#ffffff' }}>FIND</span></h2></Link>
        </div>
        <div id='nav-menu'>
          <p onClick={() => setMenuOpen(true)}>{FaBars({})}</p>
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
        {menuOpen && (
        <div className="mobile-menu-overlay">
          <div className='d-flex flex-row' id='mobile-menu' ref={menuRef}>
            <div className='d-flex flex-column mobile-menu-items'>
              <h3>MED<span style={{ color: '#ffffff' }}>FIND</span></h3>
              <Link to="/" onClick={() => setMenuOpen(false)}><p className='menu-items'>{CiHome({})}Home</p></Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}><p className='menu-items'>{CiCircleInfo({})}About</p></Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}><p className='menu-items'>{CiMail({})}Contact</p></Link>
              <Link to="/search" onClick={() => setMenuOpen(false)}><p className='menu-items'>{CiSearch({})}Search</p></Link>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}><p className='menu-items'>{CiUser({})}Profile</p></Link>
                  <p className='menu-items' onClick={() => setMenuOpen(false)}>{CiLogout({})}<SignOut /></p>
                </>
              ) : (
                <>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}><p className='menu-items'>{PiUserPlusThin({})}Sign Up</p></Link>
                  <Link to="/login" onClick={() => setMenuOpen(false)}><p className='menu-items'>{CiLogin({})}Login</p></Link>
                </>
              )}
              <Link to="/meet-the-team" onClick={() => setMenuOpen(false)}><p className='menu-items'>{PiUsersThreeThin({})}Meet the Team</p></Link>
            </div>
            <div id='close-menu'>
              <p className="close-icon" onClick={() => setMenuOpen(false)}>{FaXmark({})}</p>
            </div>
          </div>
        </div>
      )}
      </nav>
    </div>
  );
};

export default Navbar