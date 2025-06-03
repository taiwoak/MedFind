import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import '../components/medfind.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const validate = () => {
    const newErrors = { name: '', email: '', subject: '', message: '' };
    let isValid = true;

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
      isValid = false;
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    if (!user) {
      alert('You must be logged in to send a message.');
      return;
    }

    if (!validate()) return;

    try {
      const contactRef = collection(firestore, 'contacts');
      await addDoc(contactRef, {
        ...formData,
        createdAt: new Date(),
        createdBy: user.uid,
      });

      setSuccessMessage('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' id='sign-up'>
      <h3>CONTACT US TODAY!</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        {errors.subject && <p className="error-message">{errors.subject}</p>}

        <textarea
          name="message"
          placeholder="Send us a Message today!"
          value={formData.message}
          onChange={handleChange}
          required
        />
        {errors.message && <p className="error-message">{errors.message}</p>}

        <button type="submit">Send Message</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Contact;
