import React from 'react';
import { sendEmail } from '../utils/sendEmail';
import './medfind.css';

interface HealthCenter {
  name: string;
  category: string;
  address: string;
}

const EmailShareButton: React.FC<{ results: HealthCenter[] }> = ({ results }) => {
  const handleClick = () => {
    sendEmail(results);
  };

  return (
    <button onClick={handleClick} className="btn-function">
      Share via Email
    </button>
  );
};

export default EmailShareButton;