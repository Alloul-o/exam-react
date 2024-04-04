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

const AwardsCRUD = ({ onEdit }) => {
  const [awards, setAwards] = useState([]);
  const [icon, setIcon] = useState('');
  const [num, setNum] = useState('');
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

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

  // Add or update an award
  const saveAward = () => {
    if (editMode && editId) {
      db.collection('awards').doc(editId).update({
        icon: icon,
        num: num,
        name: name
      });
      setEditMode(false);
      setEditId(null);
    } else {
      db.collection('awards').add({
        icon: icon,
        num: num,
        name: name
      });
    }
    setIcon('');
    setNum('');
    setName('');
  };

  // Pre-fill the form with award data for editing
  const editAward = (id, icon, num, name) => {
    setEditMode(true);
    setEditId(id);
    setIcon(icon);
    setNum(num);
    setName(name);
    onEdit();
  };

  // Delete an award
  const deleteAward = (id) => {
    db.collection('awards').doc(id).delete();
  };

  return (
    <div>
      <h2>Awards CRUD with Firebase Firestore</h2>
      <div>
        <h3>{editMode ? 'Edit' : 'Add'} an award</h3>
        <input type="text" placeholder="Icon" value={icon} onChange={(e) => setIcon(e.target.value)} />
        <input type="text" placeholder="Num" value={num} onChange={(e) => setNum(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={saveAward}>{editMode ? 'Edit' : 'Add'}</button>
      </div>
      <div>
        <h3>List of Awards</h3>
        <ul>
          {awards.map((award) => (
            <li key={award.id}>
              <strong>{award.icon}</strong> ({award.num}, {award.name})
              <button onClick={() => editAward(award.id, award.icon, award.num, award.name)}>Edit</button>
              <button onClick={() => deleteAward(award.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AwardsCRUD;
