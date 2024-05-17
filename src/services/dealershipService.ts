import { Dealership } from '../models/Dealership';
import { dealershipRepository } from '../repositories/dealershipRepository';
import { v4 as uuidv4 } from 'uuid';
const dealershipService = {
  getAllDealerships: async (): Promise<Dealership[]> => {
    try {
      return await dealershipRepository.getAllDealerships();
    } catch (error) {
      console.error('Error fetching all dealerships:', error);
      throw error;
    }
  },

  getDealershipById: async (id: string): Promise<Dealership | null> => {
    try {
      return await dealershipRepository.getDealershipById(id);
    } catch (error) {
      console.error('Error fetching dealership by ID:', error);
      throw error;
    }
  },

  addDealership: async (newDealership: Dealership): Promise<boolean> => {
    try {
      newDealership._id = uuidv4();
      await dealershipRepository.addDealership(newDealership);
      return true;
    } catch (error) {
      console.error('Error adding dealership:', error);
      return false;
    }
  },

  updateDealership: async (id: string, updatedDealership: Dealership): Promise<boolean> => {
    try {
      const result = await dealershipRepository.updateDealership(id, updatedDealership);
      return !!result; // Convert result to boolean
    } catch (error) {
      console.error('Error updating dealership:', error);
      return false;
    }
  },

  isCarAssociatedWithDealership: async (carId: string, dealershipId: string): Promise<boolean> => {
    try {
      const result = await dealershipRepository.isCarAssociatedWithDealership(carId,dealershipId)
      return !!result; // Convert result to boolean
    } catch (error) {
      console.error('Error updating dealership:', error);
      return false;
    }
  },

  deleteDealership: async (id: string): Promise<boolean> => {
    try {
      await dealershipRepository.deleteDealership(id);
      return true;
    } catch (error) {
      console.error('Error deleting dealership:', error);
      return false;
    }
  }
};

export default dealershipService;
