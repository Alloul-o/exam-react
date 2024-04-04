import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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

const RecentCard = () => {
  const [listings, setListings] = useState([]);
  const [clientName, setClientName] = useState('');

  // Load real estate listings from Firebase Firestore
  useEffect(() => {
    const unsubscribe = db.collection('listings').onSnapshot((snapshot) => {
      const listingsData = [];
      snapshot.forEach((doc) => {
        listingsData.push({ id: doc.id, ...doc.data() });
      });
      setListings(listingsData);
    });

    return () => unsubscribe();
  }, []);

  const handleCommandClick = async (listingId) => {
    if (!clientName) {
      alert('Please enter your name.');
      return;
    }

    try {
      await db.collection('commands').add({
        listingId: listingId,
        clientName: clientName,
      });
      setClientName('');
    } catch (error) {
      console.error('Error adding command:', error);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>
      <div className='content grid3 mtop'>
        {listings.map((listing, index) => {
          const { id, cover, category, location, name, price, type } = listing;
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>{category}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2' onClick={() => handleCommandClick(id)}>
                    {price}
                  </button>
                  <label htmlFor=''>/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
