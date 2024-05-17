"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const carRoutes_1 = __importDefault(require("./routes/carRoutes"));
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.use('/api/cars', carRoutes_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
