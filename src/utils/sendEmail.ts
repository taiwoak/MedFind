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

  const tableRows = results.map((center, index) => {
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${center.name}</td>
      <td>${center.category}</td>
      <td>${center.address}</td>
    </tr>
  `;
}).join('');

const message = `
  <p>Here are your search results for health centers:</p>
  <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
    <thead>
      <tr>
        <th>S/N</th>
        <th>Name</th>
        <th>Category</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
`;

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
