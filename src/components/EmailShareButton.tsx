import React from 'react';
import { sendEmail } from '../utils/sendEmail';
import './medfind.css'

const EmailShareButton: React.FC<{ searchParams: any }> = ({ searchParams }) => {
  const handleClick = () => {
    const subject = 'Health Center Search Results';
    const body = `Here are the search results: ${JSON.stringify(searchParams)}`;
    sendEmail(subject, body);
  };

  return (
    <button onClick={handleClick} className='btn-function'>
      Share via Email
    </button>
  );
};

export default EmailShareButton;
