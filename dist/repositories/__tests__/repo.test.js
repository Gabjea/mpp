"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carRepository_1 = __importDefault(require("../carRepository"));
jest.mock('../carRepository', () => ({
    __esModule: true,
    default: Object.assign(Object.assign({}, jest.requireActual('../carRepository').default), { updateCar: jest.fn() }),
}));
describe('Car Repository', () => {
    let mockCars;
    beforeEach(() => {
        // Clear books before each test
        carRepository_1.default.getAllCars().length = 0;
    });
    test('getAllCars returns empty array initially', () => {
        const cars = carRepository_1.default.getAllCars();
        expect(cars).toEqual([]);
    });
    test('getBookById returns the correct book', () => {
        const car1 = { id: '1', make: 'Toyota', model: 'Corolla', productionYear: 2021 };
        const car2 = { id: '2', make: 'Honda', model: 'Civic', productionYear: 2021 };
        carRepository_1.default.addCar(car1);
        carRepository_1.default.addCar(car2);
        const foundBook = carRepository_1.default.getCarById('2');
        expect(foundBook).toEqual(car2);
    });
    test('createBook adds a new book to the repository', () => {
        const car = { id: '1', make: 'Toyota', model: 'Corolla', productionYear: 2021 };
        carRepository_1.default.addCar(car);
        const cars = carRepository_1.default.getAllCars();
        expect(cars.length).toBe(1);
        expect(cars[0]).toEqual(car);
    });
    test('updateBook updates the correct book', () => {
        const car1 = { id: '1', make: 'Toyota', model: 'Corolla', productionYear: 2021 };
        const car2 = { id: '1', make: 'Honda', model: 'Civic', productionYear: 2021 };
        carRepository_1.default.addCar(car1);
        carRepository_1.default.updateCar('1', car2);
        const books = carRepository_1.default.getAllCars();
        expect(books.length).toBe(1);
        console.log(books);
        expect(books[0]).toEqual(car2);
    });
    test('deleteBook deletes the correct book', () => {
        const car1 = { id: '1', make: 'Toyota', model: 'Corolla', productionYear: 2021 };
        const car2 = { id: '2', make: 'Honda', model: 'Civic', productionYear: 2021 };
        carRepository_1.default.addCar(car1);
        carRepository_1.default.addCar(car2);
        carRepository_1.default.deleteCar('1');
        const cars = carRepository_1.default.getAllCars();
        expect(cars.length).toBe(1);
        expect(cars[0]).toEqual(car2);
    });
});
