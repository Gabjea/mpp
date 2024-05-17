"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carRepository_1 = __importDefault(require("../carRepository"));
describe('carRepository', () => {
    let testCar;
    beforeEach(() => {
        // Create a test car object
        testCar = {
            id: 'test-id',
            make: 'Test Make',
            model: 'Test Model',
            productionYear: 2022
        };
        // Reset cars array before each test
        carRepository_1.default.getAllCars = jest.fn().mockReturnValue([]);
    });
    afterEach(() => {
        // Reset mock implementations after each test
        jest.clearAllMocks();
    });
    describe('getAllCars', () => {
        it('should return an array of cars', () => {
            const cars = carRepository_1.default.getAllCars();
            expect(cars).toEqual([]);
        });
    });
    describe('getCarById', () => {
        it('should return the car with the specified id', () => {
            carRepository_1.default.getAllCars = jest.fn().mockReturnValue([testCar]);
            const car = carRepository_1.default.getCarById('test-id');
            expect(car).toEqual(testCar);
        });
        it('should return undefined if car with specified id is not found', () => {
            const car = carRepository_1.default.getCarById('non-existing-id');
            expect(car).toBeUndefined();
        });
    });
    describe('addCar', () => {
        it('should add a new car to the repository', () => {
            const result = carRepository_1.default.addCar(testCar);
            expect(result).toBe(true);
            const cars = carRepository_1.default.getAllCars();
            expect(cars).toEqual([testCar]);
        });
    });
    describe('updateCar', () => {
        it('should update an existing car in the repository', () => {
            carRepository_1.default.addCar(testCar);
            const updatedCar = {
                id: 'test-id',
                make: 'Updated Make',
                model: 'Updated Model',
                productionYear: 2023
            };
            const result = carRepository_1.default.updateCar('test-id', updatedCar);
            expect(result).toBe(true);
            const cars = carRepository_1.default.getAllCars();
            expect(cars).toEqual([updatedCar]);
        });
        it('should return false if car with specified id is not found', () => {
            const result = carRepository_1.default.updateCar('non-existing-id', testCar);
            expect(result).toBe(false);
        });
    });
    describe('deleteCar', () => {
        it('should delete an existing car from the repository', () => {
            carRepository_1.default.addCar(testCar);
            const result = carRepository_1.default.deleteCar('test-id');
            expect(result).toBe(true);
            const cars = carRepository_1.default.getAllCars();
            expect(cars).toEqual([]);
        });
        it('should return false if car with specified id is not found', () => {
            const result = carRepository_1.default.deleteCar('non-existing-id');
            expect(result).toBe(false);
        });
    });
});
