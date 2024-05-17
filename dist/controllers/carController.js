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
exports.deleteCar = exports.updateCar = exports.addCar = exports.getCarById = exports.getAllCars = void 0;
const carService_1 = __importDefault(require("../services/carService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateCarData = (car) => {
    return (!!car.make &&
        !!car.model &&
        typeof car.productionYear === "number" &&
        !isNaN(car.productionYear));
};
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers["authorization"];
        if (token) {
            const decodedToken = jsonwebtoken_1.default.decode(token);
            const cars = yield carService_1.default.getAllCars(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId);
            res.json(cars);
        }
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: "Error retrieving cars",
            error: error.message,
        });
    }
});
exports.getAllCars = getAllCars;
const getCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const car = yield carService_1.default.getCarById(id);
        if (car) {
            res.json(car);
        }
        else {
            res.status(404).json({ message: "Car not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: "Error retrieving car",
            error: error.message,
        });
    }
});
exports.getCarById = getCarById;
const addCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const token = req.headers["authorization"];
    if (token) {
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (!validateCarData(body)) {
            return res.status(400).json({ message: "Invalid car data" });
        }
        try {
            body.createdBy = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId;
            const success = yield carService_1.default.addCar(body);
            if (success) {
                res.status(201).json({ message: "Car added successfully" });
            }
            else {
                res.status(500).json({ message: "Failed to add car" });
            }
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error adding car", error: error.message });
        }
    }
});
exports.addCar = addCar;
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedCar = req.body;
    if (!validateCarData(updatedCar)) {
        return res.status(400).json({ message: "Invalid car data" });
    }
    try {
        const success = yield carService_1.default.updateCar(id, updatedCar);
        if (success) {
            res.json({ message: "Car updated successfully" });
        }
        else {
            res.status(404).json({ message: "Car not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error updating car", error: error.message });
    }
});
exports.updateCar = updateCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const success = yield carService_1.default.deleteCar(id);
        if (success) {
            res.json({ message: "Car deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Car not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting car", error: error.message });
    }
});
exports.deleteCar = deleteCar;
