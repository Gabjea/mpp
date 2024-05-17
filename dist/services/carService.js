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
const uuid_1 = require("uuid");
const carRepository_1 = __importDefault(require("../repositories/carRepository"));
const carService = {
    getAllCars: (createdBy) => __awaiter(void 0, void 0, void 0, function* () { return yield carRepository_1.default.getAllCars(createdBy); }),
    getCarById: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield carRepository_1.default.getCarById(id); }),
    addCar: (car) => __awaiter(void 0, void 0, void 0, function* () {
        if (!car._id)
            car._id = (0, uuid_1.v4)();
        return yield carRepository_1.default.createCar(car);
    }),
    updateCar: (id, car) => __awaiter(void 0, void 0, void 0, function* () { return yield carRepository_1.default.updateCar(id, car); }),
    deleteCar: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield carRepository_1.default.deleteCar(id); })
};
exports.default = carService;
