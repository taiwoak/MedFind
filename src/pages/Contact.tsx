import React from 'react';
import '../components/medfind.css';

const Contact: React.FC = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center' id='sign-up'>
      <h3>CONTACT US TODAY!</h3>
      <form >
        <input
          type="text"
          placeholder="Full Name"
          value=""
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value=""
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value=""
          required
        />
        <textarea
          placeholder="Send us a Message today!"
          value=""
          required
        />
        <button type="submit">Send Message</button>
      </form>
      </div>
  );
};

export default Contact;