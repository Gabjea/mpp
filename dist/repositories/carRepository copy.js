"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const faker_1 = __importDefault(require("faker"));
const generateFakeCarData = () => {
    const cars = [];
    for (let i = 0; i < 20; i++) {
        const car = {
            id: (0, uuid_1.v4)(),
            make: faker_1.default.vehicle.manufacturer(),
            model: faker_1.default.vehicle.model(),
            productionYear: faker_1.default.random.number({ min: 1990, max: 2024 }) // Generate a random year between 1990 and 2024
        };
        cars.push(car);
    }
    return cars;
};
let cars = generateFakeCarData();
const carRepository = {
    generateNewCar: () => {
        const newCar = {
            id: faker_1.default.datatype.uuid(),
            make: faker_1.default.vehicle.manufacturer(),
            model: faker_1.default.vehicle.model(),
            productionYear: faker_1.default.datatype.number({ min: 1990, max: 2024 })
        };
        // Add the new car to the cars list
        cars.push(newCar);
        // Return the new car
        return newCar;
    },
    getAllCars: () => cars,
    getCarById: (id) => cars.find(car => car.id === id),
    addCar: (newCar) => {
        try {
            cars.push(newCar);
            return true;
        }
        catch (error) {
            console.error('Error adding car:', error);
            return false;
        }
    },
    updateCar: (id, updatedCar) => {
        try {
            const index = cars.findIndex(car => car.id === id);
            if (index !== -1) {
                cars[index].make = updatedCar.make;
                cars[index].model = updatedCar.model;
                cars[index].productionYear = updatedCar.productionYear;
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error updating car:', error);
            return false;
        }
    },
    deleteCar: (id) => {
        try {
            const index = cars.findIndex(car => car.id === id);
            if (index !== -1) {
                cars.splice(index, 1);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error deleting car:', error);
            return false;
        }
    },
};
exports.default = carRepository;
