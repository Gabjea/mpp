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
const faker_1 = __importDefault(require("faker"));
const uuid_1 = require("uuid");
// Define Car Schema
const carSchema = new mongoose_1.default.Schema({
    _id: String,
    make: String,
    model: String,
    productionYear: Number,
    createdBy: { type: mongoose_1.default.Schema.Types.String, ref: 'User' }
});
// Define Car model
const CarModel = mongoose_1.default.model('Car', carSchema);
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:2717/mpp')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));
// CRUD Operations for Cars
const carRepository = {
    generateNewCar: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newCar = new CarModel({
                _id: (0, uuid_1.v4)(),
                make: faker_1.default.vehicle.manufacturer(),
                model: faker_1.default.vehicle.model(),
                productionYear: faker_1.default.random.number({ min: 1990, max: 2024 })
            });
            yield newCar.save();
            return newCar.toObject();
        }
        catch (error) {
            console.error('Error generating new car:', error);
            throw error;
        }
    }),
    createCar: (newCar) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const car = new CarModel(newCar);
            yield car.save();
            return true;
        }
        catch (error) {
            console.error('Error creating car:', error);
            return false;
        }
    }),
    getAllCars: (createdBy) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cars = yield CarModel.find({ createdBy });
            return cars.map(car => car.toObject());
        }
        catch (error) {
            console.error('Error fetching cars:', error);
            return [];
        }
    }),
    getCarById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const car = yield CarModel.findById(id);
            return car ? car.toObject() : null;
        }
        catch (error) {
            console.error('Error fetching car by ID:', error);
            return null;
        }
    }),
    updateCar: (id, car) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedCar = yield CarModel.findByIdAndUpdate(id, car, { new: true });
            return true;
        }
        catch (error) {
            console.error('Error updating car:', error);
            return false;
        }
    }),
    deleteCar: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield CarModel.findByIdAndDelete(id);
            console.log('Car deleted successfully');
            return true;
        }
        catch (error) {
            console.error('Error deleting car:', error);
            return false;
        }
    })
};
exports.default = carRepository;
