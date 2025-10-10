import React, { useState } from 'react';
import './medfind.css';
import { sendSearchResults } from '../utils/sendSearchResults';

interface HealthCenter {
  name: string;
  category: string;
  address: string;
}

interface EmailShareButtonProps {
  results: HealthCenter[];
  totalPages: number;
}

const EmailShareButton: React.FC<EmailShareButtonProps> = ({ results, totalPages }) => {
  const [buttonText, setButtonText] = useState('Share via Email');

  const handleClick = () => {

    if (totalPages > 10) {
      alert(
        'The email could not be sent because the results are too large.\n' +
        'If your search result spans more than 10 pages, kindly use the "Export to CSV" option instead.'
      );
      return;
    }

    setButtonText('Sending...');

    sendSearchResults(
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
    <button onClick={handleClick} className="btn-function" style={{
    backgroundColor: buttonText === 'Sending...' ? '#344e41' : '',
    color: buttonText === 'Sending...' ? '#ffffff' : '',
  }}>
      {buttonText}
    </button>
  );
};

export default EmailShareButton;
