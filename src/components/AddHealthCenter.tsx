import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

const AddHealthCenter: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        // Reference to the Firestore collection
        const healthCentersRef = collection(firestore, 'healthCenters');

        // Add a new document with the input values
        await addDoc(healthCentersRef, {
          name,
          address,
          category,
          createdBy: user.uid,
          createdAt: new Date() // Optional: Add a timestamp
        });

        // Clear the form fields
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
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">Add Health Center</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default AddHealthCenter;