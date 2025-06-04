import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteTitleHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titles: { [key: string]: string } = {
      '/': 'Home | MedFind',
      '/about': 'About | MedFind',
      '/contact': 'Contact Us | MedFind',
      '/search': 'Find Health Centers in Nigeria | MedFind',
      '/login': 'Login | MedFind',
      '/signup': 'Sign Up | MedFind',
      '/profile': 'Add Health Center | MedFind',
      '/meet-the-team': 'Meet The Team | MedFind'
    };

    const defaultTitle = 'Home | MedFind';
    document.title = titles[path] || defaultTitle;
  }, [location]);

  return null;
};

export default RouteTitleHandler;