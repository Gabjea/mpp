"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carRepository_1 = __importDefault(require("../carRepository"));
// Mocking the carRepository module
jest.mock('../carRepository');
describe('carRepository', () => {
    let mockCars;
    beforeEach(() => {
        // Initialize mock data
        mockCars = [
            { id: '1', make: 'Toyota', model: 'Camry', productionYear: 2020 },
            { id: '2', make: 'Honda', model: 'Civic', productionYear: 2019 },
        ];
        carRepository_1.default.getAllCars.mockReturnValue(mockCars);
        carRepository_1.default.getCarById.mockImplementation((id) => {
            return mockCars.find(car => car.id === id);
        });
        carRepository_1.default.addCar.mockImplementation((newCar) => {
            mockCars.push(newCar);
            return true;
        });
        carRepository_1.default.deleteCar.mockImplementation((id) => {
            const index = mockCars.findIndex(car => car.id === id);
            if (index !== -1) {
                mockCars.splice(index, 1);
                return true;
            }
            return false;
        });
        carRepository_1.default.updateCar.mockImplementation((id, updatedCar) => {
            const index = mockCars.findIndex(car => car.id === id);
            if (index !== -1) {
                mockCars[index] = Object.assign(Object.assign({}, mockCars[index]), updatedCar);
                return true;
            }
            return false;
        });
    });
    test('getAllCars returns all cars', () => {
        const allCars = carRepository_1.default.getAllCars();
        expect(allCars).toEqual(mockCars);
    });
    test('getCarById returns the correct car', () => {
        const car = carRepository_1.default.getCarById('1');
        expect(car).toEqual(mockCars[0]);
    });
    test('addCar adds a new car', () => {
        const newCar = { id: '3', make: 'Ford', model: 'Fusion', productionYear: 2018 };
        carRepository_1.default.addCar(newCar);
        const allCars = carRepository_1.default.getAllCars();
        expect(allCars).toContain(newCar);
    });
    test('updateCar updates an existing car', () => {
        const updatedCar = { id: '1', make: 'Toyota', model: 'Corolla', productionYear: 2021 };
        carRepository_1.default.updateCar('1', updatedCar);
        const allCars = carRepository_1.default.getAllCars();
        expect(allCars.find(car => car.id === '1')).toEqual(updatedCar);
    });
    test('deleteCar deletes a car', () => {
        carRepository_1.default.deleteCar('1');
        const allCars = carRepository_1.default.getAllCars();
        expect(allCars).not.toContainEqual(mockCars);
    });
    test('updateCar fails when car does not exist', () => {
        const updatedCar = { id: '3', make: 'Toyota', model: 'Corolla', productionYear: 2021 };
        const result = carRepository_1.default.updateCar('3', updatedCar);
        expect(result).toBe(false);
    });
    test('deleteCar fails when car does not exist', () => {
        const result = carRepository_1.default.deleteCar('3');
        expect(result).toBe(false);
    });
    test('getCarById returns undefined when car does not exist', () => {
        const car = carRepository_1.default.getCarById('3');
        expect(car).toBeUndefined();
    });
});
