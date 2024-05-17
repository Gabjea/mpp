// src/routes/carRoutes.ts
import express from 'express';
import * as dealershipController from '../controllers/dealershipController';

const router = express.Router();

router.get('/', dealershipController.getAllDealerships);
router.get('/:id', dealershipController.getDealershipById);
router.get('/:dealershipId/:carId', dealershipController.isCarAssociatedWithDealership);
router.post('/', dealershipController.addDealership);
router.put('/:id', dealershipController.updateDealership);
router.delete('/:id',dealershipController.deleteDealership);

export default router;
