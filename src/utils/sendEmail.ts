import emailjs from '@emailjs/browser';
import { getAuth } from 'firebase/auth';

interface HealthCenter {
  name: string;
  category: string;
  address: string;
}

export const sendEmail = async (
  results: HealthCenter[],
  subject: string = 'Health Center Search Results'
) => {
  const user = getAuth().currentUser;

  if (!user || !user.email) {
    alert('You must be logged in to send email.');
    return;
  }

  const tableHeader = 'S/N | Name | Category | Address\n';
  const tableRows = results
    .map((center, index) => {
      return `${index + 1} | ${center.name} | ${center.category} | ${center.address}`;
    })
    .join('\n');

  const message = `Here are your search results for health centers:\n\n${tableHeader}${tableRows}`;

  const templateParams = {
    subject,
    message,
    email: user.email,
  };

  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  if (!publicKey) {
    alert("Email service not configured");
    return;
  }

  emailjs
    .send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID!,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
    )
    .then(() => {
      alert('Email sent successfully!');
    })
    .catch((error) => {
      console.error('Email send failed:', error);
      alert('The data is above limit!');
    });
};
