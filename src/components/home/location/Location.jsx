import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // Your Firebase config here
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const Location = ({ listingId }) => {
  const [commandDetails, setCommandDetails] = useState(null);
  const [listingDetails, setListingDetails] = useState(null);

  useEffect(() => {
    const fetchCommandDetails = async () => {
      const commandSnapshot = await db.collection('commands').doc(listingId).get();
      if (commandSnapshot.exists) {
        setCommandDetails(commandSnapshot.data());
      }
    };

    const fetchListingDetails = async () => {
      const listingSnapshot = await db.collection('listings').doc(listingId).get();
      if (listingSnapshot.exists) {
        setListingDetails(listingSnapshot.data());
      }
    };

    fetchCommandDetails();
    fetchListingDetails();
  }, [listingId]);

  if (!commandDetails || !listingDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className='commandDetails'>
      <h5>Command Details</h5>
      <p>Name: {commandDetails.clientName}</p>
      <p>Listing ID: {commandDetails.listingId}</p>
      
      <h5>Listing Details</h5>
      <p>Name: {listingDetails.name}</p>
      <p>Location: {listingDetails.location}</p>
      <p>Price: {listingDetails.price}</p>
      <p>Type: {listingDetails.type}</p>
      {/* Add other listing details as needed */}
    </div>
  );
};

export default Location;
