import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Heading from "../../common/Heading";
import "./awards.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhohVbe4mNORBkiz7395AhVMW3Httls5w",
  authDomain: "react-75ac4.firebaseapp.com",
  projectId: "react-75ac4",
  storageBucket: "react-75ac4.appspot.com",
  messagingSenderId: "1020834612539",
  appId: "1:1020834612539:web:8d470a9906571e1955631e",
  measurementId: "G-0EGEW830B2"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const AwardsList = () => {
  const [awards, setAwards] = useState([]);

  // Load awards from Firebase Firestore
  useEffect(() => {
    const unsubscribe = db.collection('awards').onSnapshot((snapshot) => {
      const awardsData = [];
      snapshot.forEach((doc) => {
        awardsData.push({ id: doc.id, ...doc.data() });
      });
      setAwards(awardsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <section className='awards padding'>
        <div className='container'>
          <Heading title='Over 1,24,000+ Happy User Bieng With Us Still They Love Our Services' subtitle='Our Awards' />

          <div className='content grid4 mtop'>
            {awards.map((award, index) => (
              <div className='box' key={index}>
                <div className='icon'>
                  <span>{award.icon}</span>
                </div>
                <h1>{award.num}</h1>
                <p>{award.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AwardsList;
