import { Request, Response, NextFunction } from "express";
import petsModel from "../models/pets.model";

class PetsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pets = await petsModel.getAll();
      res
        .status(200)
        .json({ status: "success", data: { pets }, count: pets.length });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const pet = await petsModel.findById(id);
      res.status(200).json({ status: "success", data: { pet } });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newPet = await petsModel.create(req.body);
      res.status(201).json({ status: "success", data: { newPet } });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedPet = await petsModel.update(id, req.body);
      res.status(200).json({ status: "success", data: { updatedPet } });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await petsModel.delete(id);
      res.status(200).json({ status: "success" });
    } catch (err) {
      next(err);
    }
  }
}

export default new PetsController();
