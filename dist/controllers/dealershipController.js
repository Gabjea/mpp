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
exports.deleteDealership = exports.updateDealership = exports.isCarAssociatedWithDealership = exports.addDealership = exports.getDealershipById = exports.getAllDealerships = void 0;
const dealershipService_1 = __importDefault(require("../services/dealershipService"));
const validateDealershipData = (dealership) => {
    return !!dealership.name && !!dealership.location;
};
const getAllDealerships = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dealerships = yield dealershipService_1.default.getAllDealerships();
        res.json(dealerships);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving dealerships', error: error.message });
    }
});
exports.getAllDealerships = getAllDealerships;
const getDealershipById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const dealership = yield dealershipService_1.default.getDealershipById(id);
        if (dealership) {
            res.json(dealership);
        }
        else {
            res.status(404).json({ message: 'Dealership not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving dealership', error: error.message });
    }
});
exports.getDealershipById = getDealershipById;
const addDealership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!validateDealershipData(body)) {
        return res.status(400).json({ message: 'Invalid dealership data' });
    }
    try {
        const success = yield dealershipService_1.default.addDealership(body);
        if (success) {
            res.status(201).json({ message: 'Dealership added successfully' });
        }
        else {
            res.status(500).json({ message: 'Failed to add dealership' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding dealership', error: error.message });
    }
});
exports.addDealership = addDealership;
const isCarAssociatedWithDealership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = req.params.carId;
    const dealershipId = req.params.dealershipId;
    try {
        const success = yield dealershipService_1.default.isCarAssociatedWithDealership(carId, dealershipId);
        if (success) {
            res.json({ message: 'Car is asociated with the dealership' });
        }
        else {
            res.json({ message: 'Car is not asociated with the dealership' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});
exports.isCarAssociatedWithDealership = isCarAssociatedWithDealership;
const updateDealership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedDealership = req.body;
    if (!validateDealershipData(updatedDealership)) {
        return res.status(400).json({ message: 'Invalid dealership data' });
    }
    try {
        const success = yield dealershipService_1.default.updateDealership(id, updatedDealership);
        if (success) {
            res.json({ message: 'Dealership updated successfully' });
        }
        else {
            res.status(404).json({ message: 'Dealership not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating dealership', error: error.message });
    }
});
exports.updateDealership = updateDealership;
const deleteDealership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const success = yield dealershipService_1.default.deleteDealership(id);
        if (success) {
            res.json({ message: 'Dealership deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Dealership not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting dealership', error: error.message });
    }
});
exports.deleteDealership = deleteDealership;
