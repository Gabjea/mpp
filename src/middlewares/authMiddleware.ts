// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader
  console.log(token);
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'buzelecurosuinchis', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    
    next(); // Pass control to the next middleware
  });
};
