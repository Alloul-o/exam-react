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

const RealEstateCRUD = () => {
  const [listings, setListings] = useState([]);
  const [name, setName] = useState('');
  const [cover, setCover] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const saveListing = () => {
    if (editMode && editId) {
      db.collection('listings').doc(editId).update({
        name,
        cover,
        location,
        category,
        price,
        type
      });
      setEditMode(false);
      setEditId(null);
    } else {
      db.collection('listings').add({
        name,
        cover,
        location,
        category,
        price,
        type
      });
    }
    setName('');
    setCover('');
    setLocation('');
    setCategory('');
    setPrice('');
    setType('');
  };

  const editListing = (id, data) => {
    setEditMode(true);
    setEditId(id);
    setName(data.name);
    setCover(data.cover);
    setLocation(data.location);
    setCategory(data.category);
    setPrice(data.price);
    setType(data.type);
  };

  const deleteListing = (id) => {
    db.collection('listings').doc(id).delete();
  };

  return (
    <div>
      <h2>Real Estate Listings CRUD</h2>
      <div>
        <h3>{editMode ? 'Edit' : 'Add'} Listing</h3>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Cover URL" value={cover} onChange={(e) => setCover(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
        <button onClick={saveListing}>{editMode ? 'Edit' : 'Add'}</button>
      </div>
      <div>
        <h3>List of Listings</h3>
        <ul>
          {listings.map((listing) => (
            <li key={listing.id}>
              <strong>{listing.name}</strong> ({listing.location}, {listing.category}, {listing.type}, {listing.price})
              <button onClick={() => editListing(listing.id, listing)}>Edit</button>
              <button onClick={() => deleteListing(listing.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealEstateCRUD;
