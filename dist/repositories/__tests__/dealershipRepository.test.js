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
const dealershipRepository_1 = require("../../repositories/dealershipRepository");
const uuid_1 = require("uuid");
// Connect to MongoDB before running tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect('mongodb://localhost:2717/mpp');
}));
// Disconnect from MongoDB after running tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe('dealershipRepository', () => {
    const carSchema = new mongoose_1.default.Schema({
        _id: String,
        make: String,
        model: String,
        productionYear: Number
    });
    // Define Car model
    const CarModel = mongoose_1.default.model('Car', carSchema);
    // Test data
    const testDealership = {
        _id: (0, uuid_1.v4)(),
        name: 'Test Dealership',
        location: 'Test Location',
        cars: []
    };
    it('should add a dealership', () => __awaiter(void 0, void 0, void 0, function* () {
        const addedDealership = yield dealershipRepository_1.dealershipRepository.addDealership(testDealership);
        expect(addedDealership).toBeDefined();
        expect(addedDealership.name).toBe(testDealership.name);
        expect(addedDealership.location).toBe(testDealership.location);
    }));
    it('should get all dealerships', () => __awaiter(void 0, void 0, void 0, function* () {
        const dealerships = yield dealershipRepository_1.dealershipRepository.getAllDealerships();
        expect(dealerships).toBeDefined();
        expect(dealerships.length).toBeGreaterThan(0);
    }));
    it('should get a dealership by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const allDealerships = yield dealershipRepository_1.dealershipRepository.getAllDealerships();
        const id = allDealerships[0]._id;
        console.log(allDealerships[0]);
        const dealership = yield dealershipRepository_1.dealershipRepository.getDealershipById(id);
        expect(dealership).toBeDefined();
        expect(dealership._id).toBe(id);
    }));
    it('should update a dealership', () => __awaiter(void 0, void 0, void 0, function* () {
        const allDealerships = yield dealershipRepository_1.dealershipRepository.getAllDealerships();
        const id = allDealerships[0]._id;
        const updatedDealership = Object.assign(Object.assign({}, allDealerships[0]), { name: 'Updated Dealership' });
        const updated = yield dealershipRepository_1.dealershipRepository.updateDealership(id, updatedDealership);
        expect(updated).toBeTruthy();
        // Verify the update
        const retrievedDealership = yield dealershipRepository_1.dealershipRepository.getDealershipById(id);
        expect(retrievedDealership).toBeDefined();
        expect(retrievedDealership.name).toBe(updatedDealership.name);
    }));
    it('should delete a dealership', () => __awaiter(void 0, void 0, void 0, function* () {
        const allDealerships = yield dealershipRepository_1.dealershipRepository.getAllDealerships();
        const id = allDealerships[0]._id;
        yield dealershipRepository_1.dealershipRepository.deleteDealership(id);
        // Verify the deletion
        const deletedDealership = yield dealershipRepository_1.dealershipRepository.getDealershipById(id);
        expect(deletedDealership).toBeNull();
    }));
});
