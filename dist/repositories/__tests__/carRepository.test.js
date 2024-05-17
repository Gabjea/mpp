"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carRepository_1 = __importDefault(require("../../repositories/carRepository"));
const uuid_1 = require("uuid");
// Connect to MongoDB before running tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect('mongodb://localhost:2717/mpp');
}));
// Disconnect from MongoDB after running tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe('carRepository', () => {
    it('should generate a new car', () => __awaiter(void 0, void 0, void 0, function* () {
        const newCar = yield carRepository_1.default.generateNewCar();
        expect(newCar).toBeDefined();
        expect(newCar.make).toBeDefined();
        expect(newCar.model).toBeDefined();
        expect(newCar.productionYear).toBeDefined();
    }));
    it('should create a car', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = {
            _id: (0, uuid_1.v4)(),
            make: 'Toyota',
            model: 'Camry',
            productionYear: 2022
        };
        const success = yield carRepository_1.default.createCar(car);
        expect(success).toBe(true);
    }));
    it('should get all cars', () => __awaiter(void 0, void 0, void 0, function* () {
        const cars = yield carRepository_1.default.getAllCars();
        expect(cars).toBeDefined();
        expect(cars.length).toBeGreaterThan(0);
    }));
    it('should get a car by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const allCars = yield carRepository_1.default.getAllCars();
        const id = allCars[0]._id; // Assuming _id is used as the ID field
        const car = yield carRepository_1.default.getCarById(id);
        expect(car).toBeDefined();
        expect(car === null || car === void 0 ? void 0 : car._id).toBe(id);
    }));
    it('should update a car', () => __awaiter(void 0, void 0, void 0, function* () {
        const allCars = yield carRepository_1.default.getAllCars();
        const id = allCars[0]._id; // Assuming _id is used as the ID field
        const updatedCar = Object.assign(Object.assign({}, allCars[0]), { make: 'Updated Make' });
        const success = yield carRepository_1.default.updateCar(id, updatedCar);
        expect(success).toBe(true);
    }));
    it('should delete a car', () => __awaiter(void 0, void 0, void 0, function* () {
        const allCars = yield carRepository_1.default.getAllCars();
        const id = allCars[0]._id; // Assuming _id is used as the ID field
        const success = yield carRepository_1.default.deleteCar(id);
        expect(success).toBe(true);
    }));
});
