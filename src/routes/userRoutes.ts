// src/routes/userRoutes.ts
import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/:username', userController.getUserByUsername);
router.delete('/:id', userController.deleteUser);

export default router;
