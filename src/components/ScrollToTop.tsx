import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.hash) {
        const id = location.hash.substring(1);

        if (id === 'faq') {
          const offset = window.innerHeight * 1.8;
          window.scrollTo({ top: offset, behavior: 'smooth' });
          return;
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleScroll(); // scroll on initial mount
    window.addEventListener('hashchange', handleScroll);

    return () => {
      window.removeEventListener('hashchange', handleScroll);
    };
  }, [location]);

  return null;
};

export default ScrollToTop;