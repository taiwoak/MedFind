import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './medfind.css'
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Footer: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) return null;

  return (
    <footer className='footer-container'>
      <div className='d-flex flex-row align-items-start justify-content-between'>
        <div className='footer-div1'>
        <Link to ="/"><h2>MED<span style={{ color: '#ffffff' }}>FIND</span></h2></Link>
        <p>Bringing Healthcare Closer to You. Discover and explore nearby health centers across all categories, and contribute by adding new hospitals to our growing community.</p>
        <Link to='mailto:taiwoakerele98@gmail.com'><p style={{ color: '#ffffff' }}>Mail: taiwoakerele98@gmail.com</p></Link>
        <Link to="tel:+2349032562302"><p style={{ color: '#ffffff' }}>Call: +234-903-256-2302</p></Link>
        </div>
        <div className='footer-div2'>
          <h3>Services</h3>
          <Link to="/search"><p>Find Health Centers</p></Link>
          <Link to={isAuthenticated ? "/profile" : "/login"}><p>Add Health Centers</p></Link>
          <Link to="/#faq"><p>FAQs</p></Link>
        </div>
        <div className='footer-div3'>
          <h3>Company</h3>
          <Link to="/about"><p>About Us</p></Link>
          <Link to="/contact"><p>Contact Us</p></Link>
          <Link to="/"><p>Meet the Team</p></Link>
        </div>
      </div>
      <div className='footer-div4'>
        <p>Copyright © 2024 MedFind, Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
