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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const carRoutes_1 = __importDefault(require("./routes/carRoutes"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const carRepository_1 = __importDefault(require("./repositories/carRepository"));
const dealershipRoutes_1 = __importDefault(require("./routes/dealershipRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
const app = (0, express_1.default)();
const PORT = 5001;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Replace with your frontend domain
    credentials: true
}));
app.use((0, helmet_1.default)());
app.use('/api/cars', authMiddleware_1.authenticateToken, carRoutes_1.default);
app.use('/api/dealerships', authMiddleware_1.authenticateToken, dealershipRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({ server });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send('Welcome to the car updates WebSocket!');
});
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const update = {
        type: 'new_car',
        data: yield carRepository_1.default.generateNewCar()
    };
    wss.clients.forEach(client => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(JSON.stringify(update));
        }
    });
}), 50000);
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
