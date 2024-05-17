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
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
// Define User Schema
const userSchema = new mongoose_1.default.Schema({
    _id: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// Define User model
const UserModel = mongoose_1.default.model('User', userSchema);
mongoose_1.default.connect('mongodb://localhost:2717/mpp')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));
// Repository for Users
const userRepository = {
    createUser: (newUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(newUser.password, 10);
            const user = new UserModel({
                _id: (0, uuid_1.v4)(),
                username: newUser.username,
                email: newUser.email,
                password: hashedPassword,
            });
            yield user.save();
            return true;
        }
        catch (error) {
            console.error('Error creating user:', error);
            return false;
        }
    }),
    getUserByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel.findOne({ username });
            return user ? user.toObject() : null;
        }
        catch (error) {
            console.error('Error fetching user by username:', error);
            return null;
        }
    }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel.findOne({ email });
            return user ? user.toObject() : null;
        }
        catch (error) {
            console.error('Error fetching user by email:', error);
            return null;
        }
    }),
    updateUser: (id, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield UserModel.findByIdAndUpdate(id, updatedUser);
            return true;
        }
        catch (error) {
            console.error('Error updating user:', error);
            return false;
        }
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield UserModel.findByIdAndDelete(id);
            console.log('User deleted successfully');
            return true;
        }
        catch (error) {
            console.error('Error deleting user:', error);
            return false;
        }
    })
};
exports.default = userRepository;
