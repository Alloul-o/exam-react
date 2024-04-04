import { db } from '../firebase';

// Add operation for awards collection
const addAward = async (awardData) => {
  try {
    const docRef = await db.collection('awards').add(awardData);
    console.log("Award added successfully with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding award: ", error);
    throw error;
  }
};

// Delete operation for awards collection
const deleteAward = async (awardId) => {
  try {
    await db.collection('awards').doc(awardId).delete();
    console.log("Award deleted successfully!");
  } catch (error) {
    console.error("Error deleting award: ", error);
    throw error;
  }
};

// Update operation for awards collection
const updateAward = async (awardId, newData) => {
  try {
    await db.collection('awards').doc(awardId).update(newData);
    console.log("Award updated successfully!");
  } catch (error) {
    console.error("Error updating award: ", error);
    throw error;
  }
};

// Fetch operation for awards collection
const fetchAwards = async () => {
  try {
    const snapshot = await db.collection('awards').get();
    const awards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return awards;
  } catch (error) {
    console.error("Error fetching awards: ", error);
    throw error;
  }
};

export { addAward, deleteAward, updateAward, fetchAwards };
