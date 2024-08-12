import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <div className='div-about1'>
        <h1>About MedFind</h1>
        <p>
        Welcome to MedFind, your trusted companion in navigating the healthcare landscape of Nigeria. We understand that finding the right healthcare facility, whether it's a hospital, clinic, or specialized center, is crucial for your well-being and peace of mind. That’s why we’ve built MedFind—an intuitive platform designed to connect you with the best health centers near you.
        </p>
      </div>
      <div className='d-flex flex-column align-items-center justify-content-center div-about2'>
        <h3>Why MedFind?</h3>
        <p>At MedFind, we believe that healthcare should be accessible to everyone. Our platform not only allows you to locate health centers based on your specific needs but also categorizes them so you can find exactly what you're looking for, whether it's a general hospital, a specialist clinic, or a community health center.</p>
      </div>
      <div className='d-flex flex-row align-items-center justify-content-center div-about3'>
        <div className='div-about3a'>
          <h3>Your Health, Your Choice</h3>
          <p>With MedFind, you have the power to choose the best healthcare option that suits your needs. Our extensive database covers a wide range of categories, ensuring that you find the right health center close to you, no matter where you are in Nigeria.</p>
        </div>
        <div className='div-about3b'>
          <h3>Community Driven</h3>
          <p>We're more than just a search tool. MedFind empowers users to contribute by adding new health centers to our database. This community-driven approach ensures that our platform stays updated with the latest information, helping others find the care they need. Together, we can build a comprehensive and reliable healthcare directory that serves everyone.</p>
        </div>
      </div>
      <div className='d-flex flex-column align-items-center justify-content-center div-about4'>
        <h3>Join Us</h3>
        <p>Whether you're searching for a nearby clinic, exploring different healthcare options, or contributing to our growing database, MedFind is here to guide you every step of the way. Together, let's make healthcare accessible, reliable, and within reach for all Nigerians.</p>
      </div>
    </div>
  );
};

export default About;