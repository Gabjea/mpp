"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.addCar = exports.getCarById = exports.getAllCars = void 0;
const carService_1 = __importDefault(require("../services/carService"));
const validateCarData = (car) => {
    return (!!car.make &&
        !!car.model &&
        typeof car.productionYear === 'number' &&
        !isNaN(car.productionYear));
};
const getAllCars = (req, res) => {
    try {
        const cars = carService_1.default.getAllCars();
        res.json(cars);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving cars', error: error.message });
    }
};
exports.getAllCars = getAllCars;
const getCarById = (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const car = carService_1.default.getCarById(id);
        if (car) {
            res.json(car);
        }
        else {
            res.status(404).json({ message: 'Car not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving car', error: error.message });
    }
};
exports.getCarById = getCarById;
const addCar = (req, res) => {
    const { body } = req;
    if (!validateCarData(body)) {
        return res.status(400).json({ message: 'Invalid car data' });
    }
    try {
        const success = carService_1.default.addCar(body);
        if (success) {
            res.status(201).json({ message: 'Car added successfully' });
        }
        else {
            res.status(500).json({ message: 'Failed to add car' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding car', error: error.message });
    }
};
exports.addCar = addCar;
const updateCar = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCar = req.body;
    updatedCar.id = id;
    if (!validateCarData(updatedCar)) {
        return res.status(400).json({ message: 'Invalid car data' });
    }
    try {
        const success = carService_1.default.updateCar(updatedCar);
        if (success) {
            res.json({ message: 'Car updated successfully' });
        }
        else {
            res.status(404).json({ message: 'Car not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating car', error: error.message });
    }
};
exports.updateCar = updateCar;
const deleteCar = (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const success = carService_1.default.deleteCar(id);
        if (success) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Car not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting car', error: error.message });
    }
};
exports.deleteCar = deleteCar;
