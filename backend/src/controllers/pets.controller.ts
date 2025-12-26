import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import petsModel from "../models/pets.model";

class PetsController {
  async getAll(req: Request, res: Response) {
    try {
      const pets = await petsModel.getAll();
      res.status(200).json({ status: "ok", pets });
    } catch (err) {
      res.status(500).json({ status: "error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pet = await petsModel.findById(new ObjectId(id));
      res.status(200).json({ status: "ok", pet });
    } catch (err) {
      res.status(500).json({ status: "error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const pet = req.body;
      const newPet = await petsModel.create(pet);
      res.status(201).json({ status: "ok", newPet });
    } catch (err) {
      res.status(500).json({ status: "error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pet = req.body;
      const updatedPet = await petsModel.update(new ObjectId(id), pet);
      res.status(200).json({ status: "ok", updatedPet });
    } catch (err) {
      res.status(500).json({ status: "error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedPet = await petsModel.delete(new ObjectId(id));
      res.status(200).json({ status: "ok", deletedPet });
    } catch (err) {
      res.status(500).json({ status: "error" });
    }
  }
}

export default new PetsController();
