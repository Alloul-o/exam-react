
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDhohVbe4mNORBkiz7395AhVMW3Httls5w",
//   authDomain: "react-75ac4.firebaseapp.com",
//   projectId: "react-75ac4",
//   storageBucket: "react-75ac4.appspot.com",
//   messagingSenderId: "1020834612539",
//   appId: "1:1020834612539:web:8d470a9906571e1955631e",
//   measurementId: "G-0EGEW830B2"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDAmNBi7mJXByN2-ZZre1E-SoqBSAYgJ0Q",
  authDomain: "db-real-time-24de5.firebaseapp.com",
  databaseURL: "https://db-real-time-24de5-default-rtdb.firebaseio.com",
  projectId: "db-real-time-24de5",
  storageBucket: "db-real-time-24de5.appspot.com",
  messagingSenderId: "217491722332",
  appId: "1:217491722332:web:ffae958fc3e8e92893d699",
  measurementId: "G-FCHWDTB4C9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
