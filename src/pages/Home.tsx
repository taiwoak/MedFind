import React from 'react';
import { Link } from 'react-router-dom';
import '../components/medfind.css';
import hero from '../assets/front-view-black-nurses-work.jpg';
import Accordion from 'react-bootstrap/Accordion';


const Home: React.FC = () => {
  return (
    <div>
        <div className='d-flex flex-row align-items-center justify-content-around' id='hero'>
          <div className='hero-1'>
            <h1>Looking for Hospitals or Health Centers in your area?</h1>
            <p>We provide you access and visibility to a whole list of medical centers around you. You can join our ever-growing community by contributing to our list. <Link to='/about' style={{ color: '#198754' }}>Learn more about us</Link></p>
            <Link to="/signup"><button className='hero-btn'>Get Started</button></Link>
          </div>
          <div className='hero-2'>
            <img src={hero} alt="Nurses" className='hero-img' />
          </div>
        </div>
        <div className='d-flex flex-row align-items-center justify-content-center div-home3'>
        <div className='div-home3a'>
          <h3>Hospital Search</h3>
          <p>Easily find hospitals and health centers near you with our comprehensive search tool. Whether you need a specialist or general care, locate the best facilities quickly and efficiently.</p>
          <Link to="/search"><button className='nav-btn'>Continue</button></Link>
        </div>
        <div className='div-home3b'>
          <h3>Add Health Centers Around You</h3>
          <p>Contribute to the community by adding local health centers. Help others find quality care by sharing information about nearby hospitals and clinics</p>
          <Link to="/signup"><button className='nav-btn'>Continue</button></Link>
        </div>
      </div>
      <div id='#faq' className='faq-container'>
        <h1>FAQs</h1>
            <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is MedFind?</Accordion.Header>
            <Accordion.Body>
              MedFind is a platform that helps you locate hospitals and health centers in Nigeria. You can search by name, category, or state to find the best healthcare options near you.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How can I add a health center to MedFind?</Accordion.Header>
            <Accordion.Body>
              To add a health center, simply sign up or log in, and then fill out the form with the necessary details such as name, address, and category. Your contribution will help others find quality healthcare.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Is MedFind free to use?</Accordion.Header>
            <Accordion.Body>
              Yes, MedFind is completely free for all users. Our mission is to make it easier for everyone to access healthcare services by providing accurate and up-to-date information.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Can I search for specific types of health centers, like dental clinics or pharmacies?</Accordion.Header>
            <Accordion.Body>
              Absolutely! MedFind allows you to search by various categories, including dental clinics, pharmacies, general hospitals, and more. You can filter your search to find exactly what you need.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>How accurate is the information on MedFind?</Accordion.Header>
            <Accordion.Body>
              We strive to keep our database as accurate as possible by regularly updating it with new information. Users can also contribute by adding or editing health centers, helping us maintain high-quality data.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Home;