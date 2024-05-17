import mongoose, { Document } from 'mongoose';
import { Dealership } from '../models/Dealership';
import { Car } from '../models/Car';

// Define Dealership Schema
const dealershipSchema = new mongoose.Schema({
  _id: String,
  name: String,
  location: String,
  cars: [{ type: mongoose.Schema.Types.String, ref: 'Car' }],
  createdBy: { type: mongoose.Schema.Types.String, ref: 'User' }
});

// Define Dealership model
const DealershipModel = mongoose.model<Dealership & Document>('Dealership', dealershipSchema);

const dealershipRepository = {
  getAllDealerships: async (): Promise<Dealership[]> => {
    try {
      const dealerships = await DealershipModel.find().populate('cars');
      return dealerships.map(dealership => dealership.toObject());
    } catch (error) {
      console.error('Error fetching dealerships:', error);
      throw error;
    }
  },

  isCarAssociatedWithDealership: async (carId: string, dealershipId: string): Promise<boolean> => {
    try {
      const dealership = await DealershipModel.findById(dealershipId).populate('cars');
      if (!dealership) {
        throw new Error('Dealership not found');
      }
      // Check if the car exists in the cars array of the dealership
      return dealership.cars.some(car => car._id === carId);
    } catch (error) {
      console.error('Error checking car association with dealership:', error);
      throw error;
    }
  },


  getDealershipById: async (id: string): Promise<Dealership | null> => {
    try {
      const dealership = await DealershipModel.findById(id).populate('cars');
      return dealership ? dealership.toObject() : null;
    } catch (error) {
      console.error('Error fetching dealership by ID:', error);
      throw error;
    }
  },

  addDealership: async (newDealership: Dealership): Promise<Dealership> => {
    try {
      const dealership = new DealershipModel(newDealership);
      await dealership.save();
      return dealership.toObject();
    } catch (error) {
      console.error('Error adding dealership:', error);
      throw error;
    }
  },

  updateDealership: async (id: string, updatedDealership: Dealership): Promise<Dealership | null> => {
    try {
      const result = await DealershipModel.findByIdAndUpdate(id, updatedDealership, { new: true }).populate('cars');
      return result ? result.toObject() : null;
    } catch (error) {
      console.error('Error updating dealership:', error);
      throw error;
    }
  },

  deleteDealership: async (id: string): Promise<void> => {
    try {
      await DealershipModel.findByIdAndDelete(id);
      console.log('Dealership deleted successfully');
    } catch (error) {
      console.error('Error deleting dealership:', error);
      throw error;
    }
  }
};

export { dealershipRepository };
