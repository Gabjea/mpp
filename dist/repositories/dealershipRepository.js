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
exports.dealershipRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define Dealership Schema
const dealershipSchema = new mongoose_1.default.Schema({
    _id: String,
    name: String,
    location: String,
    cars: [{ type: mongoose_1.default.Schema.Types.String, ref: 'Car' }],
    createdBy: { type: mongoose_1.default.Schema.Types.String, ref: 'User' }
});
// Define Dealership model
const DealershipModel = mongoose_1.default.model('Dealership', dealershipSchema);
const dealershipRepository = {
    getAllDealerships: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dealerships = yield DealershipModel.find().populate('cars');
            return dealerships.map(dealership => dealership.toObject());
        }
        catch (error) {
            console.error('Error fetching dealerships:', error);
            throw error;
        }
    }),
    isCarAssociatedWithDealership: (carId, dealershipId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dealership = yield DealershipModel.findById(dealershipId).populate('cars');
            if (!dealership) {
                throw new Error('Dealership not found');
            }
            // Check if the car exists in the cars array of the dealership
            return dealership.cars.some(car => car._id === carId);
        }
        catch (error) {
            console.error('Error checking car association with dealership:', error);
            throw error;
        }
    }),
    getDealershipById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dealership = yield DealershipModel.findById(id).populate('cars');
            return dealership ? dealership.toObject() : null;
        }
        catch (error) {
            console.error('Error fetching dealership by ID:', error);
            throw error;
        }
    }),
    addDealership: (newDealership) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dealership = new DealershipModel(newDealership);
            yield dealership.save();
            return dealership.toObject();
        }
        catch (error) {
            console.error('Error adding dealership:', error);
            throw error;
        }
    }),
    updateDealership: (id, updatedDealership) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield DealershipModel.findByIdAndUpdate(id, updatedDealership, { new: true }).populate('cars');
            return result ? result.toObject() : null;
        }
        catch (error) {
            console.error('Error updating dealership:', error);
            throw error;
        }
    }),
    deleteDealership: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield DealershipModel.findByIdAndDelete(id);
            console.log('Dealership deleted successfully');
        }
        catch (error) {
            console.error('Error deleting dealership:', error);
            throw error;
        }
    })
};
exports.dealershipRepository = dealershipRepository;
