import mongoose from 'mongoose';

// Function to drop the 'test' collection
export async function dropDatabase() {
  try {
    // Wait for the database connection to open
    await new Promise((resolve) => mongoose.connection.once('open', resolve));

    // Drop the 'test' collection
    await mongoose.connection.db.dropDatabase();
    console.log('Connected database dropped successfully.');
  } catch (error) {
    console.error('Error dropping test collection:', error);
    throw error; // Throw error to indicate failure
  }
}