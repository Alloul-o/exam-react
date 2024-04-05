import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './commande.css'

const Commande = () => {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const db = firebase.firestore();

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const commandsSnapshot = await db.collection('commands').get();
        const commandsData = [];

        for (const doc of commandsSnapshot.docs) {
          const command = {
            id: doc.id,
            ...doc.data()
          };

          // Fetch associated listing details from 'lists' collection
          const listingSnapshot = await db.collection('listings').doc(command.listingId).get();
          const listingData = listingSnapshot.data();

          if (listingData) {
            command.listingDetails = listingData;
          }

          commandsData.push(command);
        }

        setCommands(commandsData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching commands');
        setLoading(false);
      }
    };

    fetchCommands();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div >
      <h2>Commands List</h2>
      <table className="table table-dark table-striped"  id="gold">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Listing ID</th>
            <th>Listing Details</th>
          </tr>
        </thead>
        <tbody>
          {commands.map(command => (
            <tr key={command.id}>
              <td>{command.clientName}</td>
              <td>{command.listingId}</td>
              <td>
                {command.listingDetails ? (
                  <ul>
                    <li>Name: {command.listingDetails.name}</li>
                    <li>Location: {command.listingDetails.location}</li>
                    <li>Category: {command.listingDetails.category}</li>
                    <li>Price: {command.listingDetails.price}</li>
                    {/* Add other listing details as needed */}
                  </ul>
                ) : (
                  'Listing details not found'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Commande;
