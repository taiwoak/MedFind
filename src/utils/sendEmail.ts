import emailjs from '@emailjs/browser';
import { getAuth } from 'firebase/auth';

/**
 * Send an email using EmailJS.
 * @param subject - Email subject
 * @param message - HTML message body
 * @param onSuccess - Optional callback on success
 * @param onError - Optional callback on failure
 */
export const sendEmail = async (
  subject: string,
  message: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const user = getAuth().currentUser;

  if (!user || !user.email) {
    alert('You must be logged in to send an email.');
    onError?.();
    return;
  }

  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) {
    alert('Email service not configured correctly.');
    return;
  }

  const templateParams = {
    subject,
    message,
    email: user.email,
  };

  emailjs
    .send(serviceId, templateId, templateParams, publicKey)
    .then(() => {
      alert('Email sent successfully!');
      onSuccess?.();
    })
    .catch((error) => {
      console.error('Email send failed:', error);
      alert('Failed to send email. Please try again later.');
      onError?.();
    });
};
