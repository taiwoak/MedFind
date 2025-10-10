import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { sendEmail } from '../utils/sendEmail';

const AddHealthCenter: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const categoryOptions = [
    'Community Health Center',
    'Comprehensive Health Center',
    'Cottage Hospital',
    'Dispensary',
    'District Hospital',
    'Educational Clinic',
    'Federal Medical Center',
    'Federal Staff Clinic',
    'General Hospital',
    'Laboratory',
    'Maternity Home',
    'Medical Center',
    'Military and Paramilitary Clinic',
    'Pharmacy',
    'Primary Health Center',
    'Private Non-Profit',
    'Research Hospital',
    'Specialist Hospital',
    'Teaching Hospital',
    'Veterinary Clinic',
    'Others'
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (user) {
      try {
        const healthCentersRef = collection(firestore, 'healthCenters');

        await addDoc(healthCentersRef, {
          name,
          address,
          category,
          createdBy: user.uid,
          createdAt: new Date()
        });

        const subject = `${name} is Now Live on MedFind!`;
        const message = `
          <p>Hi Medfinder,</p>
          <p>Thank you for contributing to MedFind by adding a new health center.</p>
          <p>Your input helps make healthcare more accessible to everyone.</p>
          <p><strong>Here are the details you provided:</strong></p>
          <ul>
            <li><strong>Health Center Name:</strong> ${name}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Category:</strong> ${category}</li>
          </ul>
          <p>We’re grateful for your support in helping other Medfinders discover quality healthcare options.</p>
          <p>Best regards,<br>The MedFind Team</p>
        `;

        await sendEmail(subject, message);

        setName('');
        setAddress('');
        setCategory('');
        setSuccess('Health center added successfully!');
      } catch (error) {
        console.error('Error adding document:', error);
        setError('Failed to add health center. Please try again.');
      }
    } else {
      alert('You must be logged in to add a health center.');
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' id='sign-up'>
      <h3>Add Health Center</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categoryOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="submit">Add Health Center</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default AddHealthCenter;
