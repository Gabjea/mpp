// src/controllers/dealershipController.ts
import { Request, Response } from 'express';
import { Dealership } from '../models/Dealership';
import dealershipService from '../services/dealershipService';

const validateDealershipData = (dealership: Dealership): boolean => {
  return !!dealership.name && !!dealership.location;
};

export const getAllDealerships = async (req: Request, res: Response) => {
  try {
    const dealerships = await dealershipService.getAllDealerships();
    res.json(dealerships);
  } catch (error ) {
    res.status(500).json({ message: 'Error retrieving dealerships', error: (error as Error).message });
  }
};

export const getDealershipById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const dealership = await dealershipService.getDealershipById(id);
    if (dealership) {
      res.json(dealership);
    } else {
      res.status(404).json({ message: 'Dealership not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dealership', error: (error as Error).message });
  }
};

export const addDealership = async (req: Request, res: Response) => {
  const { body } = req;
  if (!validateDealershipData(body)) {
    return res.status(400).json({ message: 'Invalid dealership data' });
  }
  try {
    const success = await dealershipService.addDealership(body);
    if (success) {
      res.status(201).json({ message: 'Dealership added successfully' });
    } else {
      res.status(500).json({ message: 'Failed to add dealership' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding dealership', error: (error as Error).message });
  }
};

export const isCarAssociatedWithDealership = async (req: Request, res: Response) => {
  const carId = req.params.carId;
  const dealershipId = req.params.dealershipId;

  try {
    const success = await dealershipService.isCarAssociatedWithDealership(carId,dealershipId);
    if (success) {
      res.json({ message: 'Car is asociated with the dealership' });
    } else {
      res.json({ message: 'Car is not asociated with the dealership' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error', error: (error as Error).message });
  }
}

export const updateDealership = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedDealership: Dealership = req.body;
  if (!validateDealershipData(updatedDealership)) {
    return res.status(400).json({ message: 'Invalid dealership data' });
  }
  try {
    const success = await dealershipService.updateDealership(id, updatedDealership);
    if (success) {
      res.json({ message: 'Dealership updated successfully' });
    } else {
      res.status(404).json({ message: 'Dealership not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating dealership', error: (error as Error).message });
  }
};

export const deleteDealership = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const success = await dealershipService.deleteDealership(id);
    if (success) {
      res.json({ message: 'Dealership deleted successfully' });
    } else {
      res.status(404).json({ message: 'Dealership not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dealership', error: (error as Error).message });
  }
};
