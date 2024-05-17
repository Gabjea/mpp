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
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const userService = {
    createUser: (newUser) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository_1.default.createUser(newUser); }),
    getUserByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository_1.default.getUserByUsername(username); }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository_1.default.getUserByEmail(email); }),
    updateUser: (id, updatedUser) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository_1.default.updateUser(id, updatedUser); }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository_1.default.deleteUser(id); })
};
exports.default = userService;
