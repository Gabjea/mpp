import { Car } from '../models/Car';
import { v4 as uuidv4 } from 'uuid';
import carRepository from '../repositories/carRepository';

const carService = {
  getAllCars: async (createdBy: string): Promise<Car[]> => await carRepository.getAllCars(createdBy),
  getCarById: async (id: string): Promise<Car | null> => await carRepository.getCarById(id),
  addCar: async (car: Car): Promise<boolean> => {
    if(!car._id)
      car._id = uuidv4();
    return await carRepository.createCar(car);
  },
  updateCar: async (id: string, car: Car): Promise<boolean> => await carRepository.updateCar(id, car),
  deleteCar: async (id: string): Promise<boolean> => await carRepository.deleteCar(id)
};

export default carService;
