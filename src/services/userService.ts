import { User } from '../models/User';
import userRepository from '../repositories/userRepository';

const userService = {
  createUser: async (newUser: User): Promise<boolean> => await userRepository.createUser(newUser),
  getUserByUsername: async (username: string): Promise<User | null> => await userRepository.getUserByUsername(username),
  getUserByEmail: async (email: string): Promise<User | null> => await userRepository.getUserByEmail(email),
  updateUser: async (id: string, updatedUser: Partial<User>): Promise<boolean> => await userRepository.updateUser(id, updatedUser),
  deleteUser: async (id: string): Promise<boolean> => await userRepository.deleteUser(id)
};

export default userService;
