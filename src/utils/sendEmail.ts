import { getAuth } from 'firebase/auth';

export const sendEmail = (subject: string, body: string) => {
  const user = getAuth().currentUser;
  if (user && user.email) {
    const mailtoLink = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  } else {
    alert('You must be logged in to share via email.');
  }
};
