import healthCentersData from '../data/nigeriahealthfacilities.json';
import { HealthCentersData } from '../types/HealthCenter';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchHealthCenters = async (): Promise<any[]> => {
  // Type assertion with additional runtime checks
  const data = healthCentersData as unknown as HealthCentersData;

  // Check if features exist and are of the correct type
  if (!Array.isArray(data.features) || data.features.length === 0) {
    throw new Error('Invalid data format');
  }

  // Map the features to the desired format
  const externalHealthCenters = data.features.map((feature) => ({
    name: feature.properties.name,
    category: feature.properties.category,
    address: `${feature.properties.lga_name}, ${feature.properties.state_name}`,
  }));

  // Fetching health centers from Firestore
  try {
    const healthCentersCollection = collection(firestore, 'healthCenters');
    const healthCentersSnapshot = await getDocs(healthCentersCollection);
    const firestoreHealthCenters = healthCentersSnapshot.docs.map(doc => doc.data());

    // Combine external data and Firestore data
    return [...externalHealthCenters, ...firestoreHealthCenters];
  } catch (error) {
    console.error('Error fetching health centers from Firestore:', error);
    return externalHealthCenters; // Return only external data if Firestore fails
  }
};

export default fetchHealthCenters;
