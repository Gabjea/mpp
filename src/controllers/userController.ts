import { Request, Response } from 'express';
import { User } from '../models/User';
import userService from '../services/userService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const validateUserData = (user: Partial<User>): boolean => {
  return (
    !!user.username &&
    !!user.email &&
    !!user.password
  );
};

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  if (!validateUserData(body)) {
    return res.status(400).json({ message: 'Invalid user data' });
  }

  try {
    const success = await userService.createUser(body);
    if (success) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      res.status(500).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
  
    // Check if username or email is provided
    if (!(username || email) || !password) {
      return res.status(400).json({ message: 'Please provide username/email and password' });
    }
  
    try {
      let user: User | null;
  
      // Authenticate user by username or email
      if (username) {
        user = await userService.getUserByUsername(username);
      } else {
        user = await userService.getUserByEmail(email!);
      }
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign({ userId: user._id }, 'buzelecurosuinchis', { expiresIn: '1h' });
  
      res.json({ token }); // Send token to client
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  };



export const getUserByUsername = async (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    const user = await userService.getUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: (error as Error).message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    const user = await userService.getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedUser: Partial<User> = req.body;
  if (!validateUserData(updatedUser)) {
    return res.status(400).json({ message: 'Invalid user data' });
  }
  try {
    const success = await userService.updateUser(id, updatedUser);
    if (success) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const success = await userService.deleteUser(id);
    if (success) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: (error as Error).message });
  }
};
