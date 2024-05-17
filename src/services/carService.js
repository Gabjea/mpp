"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carRepository_1 = __importDefault(require("../repositories/carRepository"));
const carService = {
    getAllCars: () => carRepository_1.default.getAllCars(),
    getCarById: (id) => carRepository_1.default.getCarById(id),
    addCar: (car) => carRepository_1.default.addCar(car),
    updateCar: (car) => carRepository_1.default.updateCar(car),
    deleteCar: (id) => carRepository_1.default.deleteCar(id),
};
exports.default = carService;
