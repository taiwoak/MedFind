import React, { useState } from 'react';
import { sendEmail } from '../utils/sendEmail';
import './medfind.css';

interface HealthCenter {
  name: string;
  category: string;
  address: string;
}

const EmailShareButton: React.FC<{ results: HealthCenter[] }> = ({ results }) => {
  const [buttonText, setButtonText] = useState('Share via Email');

  const handleClick = () => {
    setButtonText('Sending...');

    sendEmail(
      results,
      'Health Center Search Results',
      () => {
        setButtonText('Sent');
        setTimeout(() => setButtonText('Share via Email'), 3000);
      },
      () => {
        setButtonText('Share via Email');
      }
    );
  };

  return (
    <button onClick={handleClick} className="btn-function">
      {buttonText}
    </button>
  );
};

export default EmailShareButton;
