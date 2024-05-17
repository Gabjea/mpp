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
Object.defineProperty(exports, "__esModule", { value: true });
const dealershipRepository_1 = require("../repositories/dealershipRepository");
const uuid_1 = require("uuid");
const dealershipService = {
    getAllDealerships: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dealershipRepository_1.dealershipRepository.getAllDealerships();
        }
        catch (error) {
            console.error('Error fetching all dealerships:', error);
            throw error;
        }
    }),
    getDealershipById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dealershipRepository_1.dealershipRepository.getDealershipById(id);
        }
        catch (error) {
            console.error('Error fetching dealership by ID:', error);
            throw error;
        }
    }),
    addDealership: (newDealership) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            newDealership._id = (0, uuid_1.v4)();
            yield dealershipRepository_1.dealershipRepository.addDealership(newDealership);
            return true;
        }
        catch (error) {
            console.error('Error adding dealership:', error);
            return false;
        }
    }),
    updateDealership: (id, updatedDealership) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield dealershipRepository_1.dealershipRepository.updateDealership(id, updatedDealership);
            return !!result; // Convert result to boolean
        }
        catch (error) {
            console.error('Error updating dealership:', error);
            return false;
        }
    }),
    isCarAssociatedWithDealership: (carId, dealershipId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield dealershipRepository_1.dealershipRepository.isCarAssociatedWithDealership(carId, dealershipId);
            return !!result; // Convert result to boolean
        }
        catch (error) {
            console.error('Error updating dealership:', error);
            return false;
        }
    }),
    deleteDealership: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield dealershipRepository_1.dealershipRepository.deleteDealership(id);
            return true;
        }
        catch (error) {
            console.error('Error deleting dealership:', error);
            return false;
        }
    })
};
exports.default = dealershipService;
