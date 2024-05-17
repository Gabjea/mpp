import mongoose, { Document } from 'mongoose';
import { Car } from '../models/Car';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
// Define Car Schema
const carSchema = new mongoose.Schema({
  _id: String,
  make: String,
  model: String,
  productionYear: Number,
  createdBy: { type: mongoose.Schema.Types.String, ref: 'User' }
});

// Define Car model
const CarModel = mongoose.model<Car & Document>('Car', carSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:2717/mpp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// CRUD Operations for Cars
const carRepository = {


  generateNewCar: async (): Promise<Car> => {
    try {
      const newCar = new CarModel({
        _id : uuidv4(),
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        productionYear: faker.random.number({ min: 1990, max: 2024 })
      });
      await newCar.save();
      return newCar.toObject();
    } catch (error) {
      console.error('Error generating new car:', error);
      throw error;
    }
  },

  createCar: async (newCar : Car): Promise<boolean> => {
    try {
      const car = new CarModel(newCar);
      await car.save();
      return true;
    } catch (error) {
      console.error('Error creating car:', error);
      return false;
    }
  },

  getAllCars: async (createdBy: string): Promise<Car[]> => {
    try {
      const cars = await CarModel.find({createdBy});
      return cars.map(car => car.toObject());
    } catch (error) {
      console.error('Error fetching cars:', error);
      return []
    }
  },

  getCarById: async (id: string): Promise<Car | null> => {
    try {
      const car = await CarModel.findById(id);
      return car ? car.toObject() : null;
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      return null;
    }
  },

  updateCar: async (id: string, car: Car): Promise<boolean> => {
    try {
      const updatedCar = await CarModel.findByIdAndUpdate(id, car, { new: true });
      return true;
    } catch (error) {
      console.error('Error updating car:', error);
      return false
    }
  },

  deleteCar: async (id: string): Promise<boolean> => {
    try {
      await CarModel.findByIdAndDelete(id);
      console.log('Car deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting car:', error);
      return false;
    }
  }
};

export default carRepository;
