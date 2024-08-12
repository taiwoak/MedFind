import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaXLaUis2MXrpoQIDz-bnZTJQs7ZoMyK4",
  authDomain: "medfind-1dced.firebaseapp.com",
  projectId: "medfind-1dced",
  storageBucket: "medfind-1dced.appspot.com",
  messagingSenderId: "614836530387",
  appId: "1:614836530387:web:8162fc2db050acd701f826",
  measurementId: "G-3K5QHHG361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };