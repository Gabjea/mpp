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
exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getUserByUsername = exports.login = exports.createUser = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validateUserData = (user) => {
    return (!!user.username &&
        !!user.email &&
        !!user.password);
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!validateUserData(body)) {
        return res.status(400).json({ message: 'Invalid user data' });
    }
    try {
        const success = yield userService_1.default.createUser(body);
        if (success) {
            res.status(201).json({ message: 'User created successfully' });
        }
        else {
            res.status(500).json({ message: 'Failed to create user' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    // Check if username or email is provided
    if (!(username || email) || !password) {
        return res.status(400).json({ message: 'Please provide username/email and password' });
    }
    try {
        let user;
        // Authenticate user by username or email
        if (username) {
            user = yield userService_1.default.getUserByUsername(username);
        }
        else {
            user = yield userService_1.default.getUserByEmail(email);
        }
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'buzelecurosuinchis', { expiresIn: '1h' });
        res.json({ token }); // Send token to client
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});
exports.login = login;
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    try {
        const user = yield userService_1.default.getUserByUsername(username);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
});
exports.getUserByUsername = getUserByUsername;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        const user = yield userService_1.default.getUserByEmail(email);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
});
exports.getUserByEmail = getUserByEmail;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedUser = req.body;
    if (!validateUserData(updatedUser)) {
        return res.status(400).json({ message: 'Invalid user data' });
    }
    try {
        const success = yield userService_1.default.updateUser(id, updatedUser);
        if (success) {
            res.json({ message: 'User updated successfully' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const success = yield userService_1.default.deleteUser(id);
        if (success) {
            res.json({ message: 'User deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});
exports.deleteUser = deleteUser;
