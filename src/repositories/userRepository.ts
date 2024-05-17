import mongoose, { Document } from 'mongoose';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Define User Schema
const userSchema = new mongoose.Schema({
  _id: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define User model
const UserModel = mongoose.model<User & Document>('User', userSchema);

mongoose.connect('mongodb://localhost:2717/mpp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// Repository for Users
const userRepository = {
  createUser: async (newUser: User): Promise<boolean> => {
    try {
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const user = new UserModel({
        _id: uuidv4(),
        username: newUser.username,
        email: newUser.email,
        password: hashedPassword,
      });
      await user.save();
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  },

  getUserByUsername: async (username: string): Promise<User | null> => {
    try {
      const user = await UserModel.findOne({ username });
      return user ? user.toObject() : null;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return null;
    }
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    try {
      const user = await UserModel.findOne({ email });
      return user ? user.toObject() : null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  },

  updateUser: async (id: string, updatedUser: Partial<User>): Promise<boolean> => {
    try {
      await UserModel.findByIdAndUpdate(id, updatedUser);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  },

  deleteUser: async (id: string): Promise<boolean> => {
    try {
      await UserModel.findByIdAndDelete(id);
      console.log('User deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
};

export default userRepository;
