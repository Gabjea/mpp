"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    console.log(token);
    if (!token) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, 'buzelecurosuinchis', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        next(); // Pass control to the next middleware
    });
};
exports.authenticateToken = authenticateToken;
