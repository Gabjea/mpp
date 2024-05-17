import express from 'express';
import bodyParser from 'body-parser';
import carRoutes from './routes/carRoutes';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import WebSocket from 'ws';
import carRepository from './repositories/carRepository';
import dealershipRoutes from './routes/dealershipRoutes';
import userRoutes from './routes/userRoutes';
import { authenticateToken } from './middlewares/authMiddleware'; 
const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend domain
  credentials: true
}));

app.use(helmet());

app.use('/api/cars',authenticateToken, carRoutes);
app.use('/api/dealerships',authenticateToken, dealershipRoutes);
app.use('/api/users', userRoutes);

const server = http.createServer(app);


const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.send('Welcome to the car updates WebSocket!');
});


setInterval(async () => {
  const update = {
    type: 'new_car',
    data: await carRepository.generateNewCar() 
  };

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(update));
    }
  });
}, 50000); 



server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
