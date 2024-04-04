
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhohVbe4mNORBkiz7395AhVMW3Httls5w",
  authDomain: "react-75ac4.firebaseapp.com",
  projectId: "react-75ac4",
  storageBucket: "react-75ac4.appspot.com",
  messagingSenderId: "1020834612539",
  appId: "1:1020834612539:web:8d470a9906571e1955631e",
  measurementId: "G-0EGEW830B2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
