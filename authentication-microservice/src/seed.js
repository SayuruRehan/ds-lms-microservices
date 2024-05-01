import mongoose from "mongoose";
import { connectDB } from "../configs/DBConnect.js";
import User from "./schemas/user.schema.js";
import { dropDatabase } from "./utils/db.util.js";

const admin = {
    NIC: '123456789V',
    email: 'admin@test.com',
    name: 'John',
    password: 'test123',
    role: 'admin'
  };

  connectDB();
  // Function to seed the database
  async function seedDatabase() {
    try {
      // Insert seed data
      await User.create(admin);
  
      console.log('Database seeded successfully.');
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error; // Throw error to indicate failure
    }
  }
  
  // Reset and seed the database
  async function resetAndSeedDatabase() {
    try {
      await dropDatabase(); // Drop the database
      await seedDatabase(); // Seed the database
    } catch (error) {
      console.error('Error resetting and seeding database:', error);
    } finally {
      // Disconnect from MongoDB
      mongoose.disconnect();
    }
  }
  
  // Reset and seed the database
  resetAndSeedDatabase();