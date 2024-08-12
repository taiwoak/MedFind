import React from 'react';
import { generateShareLink } from '../utils/generateShareLink';
import './medfind.css'

const LinkShareButton: React.FC<{ searchParams: any }> = ({ searchParams }) => {
  const handleClick = () => {
    const shareLink = generateShareLink(searchParams);
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };

  return (
    <button onClick={handleClick} className='btn-function'>
      Share Link
    </button>
  );
};

export default LinkShareButton;
