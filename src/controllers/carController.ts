// src/controllers/carController.ts
import { Request, Response } from "express";
import { Car } from "../models/Car";
import carService from "../services/carService";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  // Add other properties from your JWT payload if needed
}
const validateCarData = (car: Car): boolean => {
  return (
    !!car.make &&
    !!car.model &&
    typeof car.productionYear === "number" &&
    !isNaN(car.productionYear)
  );
};

export const getAllCars = async (req: Request, res: Response) => {
  
  try {
    const token = req.headers["authorization"];
    if (token) {
      const decodedToken = jwt.decode(token) as JwtPayload;
    const cars = await carService.getAllCars(decodedToken?.userId);
    res.json(cars);
    }
    
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving cars",
        error: (error as Error).message,
      });
  }

};

export const getCarById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const car = await carService.getCarById(id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving car",
        error: (error as Error).message,
      });
  }
};
export const addCar = async (req: Request, res: Response) => {
  const { body } = req;
  const token = req.headers["authorization"];
  if (token) {
    const decodedToken = jwt.decode(token) as JwtPayload;

   

    if (!validateCarData(body)) {
      return res.status(400).json({ message: "Invalid car data" });
    }
    try {
      body.createdBy = decodedToken?.userId;
      const success = await carService.addCar(body);
      if (success) {
        res.status(201).json({ message: "Car added successfully" });
      } else {
        res.status(500).json({ message: "Failed to add car" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding car", error: (error as Error).message });
    }
  }
};

export const updateCar = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedCar: Car = req.body;
  if (!validateCarData(updatedCar)) {
    return res.status(400).json({ message: "Invalid car data" });
  }
  try {
    const success = await carService.updateCar(id, updatedCar);
    if (success) {
      res.json({ message: "Car updated successfully" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating car", error: (error as Error).message });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const success = await carService.deleteCar(id);
    if (success) {
      res.json({ message: "Car deleted successfully" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting car", error: (error as Error).message });
  }
};
