import { Request, Response } from "express";
import petsModel from "../models/pets.model";

class PetsController {
  async create(req: Request, res: Response) {
    try {
      const pet = req.body;
      const newPet = await petsModel.create(pet);
      res.status(201).json({ message: "create", status: "ok", newPet });
    } catch (err) {
      res.status(500).json({ message: "create", status: "error" });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const petId = req.params.id;
      const pet = await petsModel.findById(petId);
      res.status(200).json({ message: "get", status: "ok", pet });
    } catch (err) {
      res.status(500).json({ message: "get", status: "error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "update", status: "ok" });
    } catch (err) {
      res.status(500).json({ message: "update", status: "error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "delete", status: "ok" });
    } catch (err) {
      res.status(500).json({ message: "delete", status: "error" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pets = await petsModel.getAll();
      res.status(200).json({ message: "getAll", status: "ok", pets });
    } catch (err) {
      res.status(500).json({ message: "getAll", status: "error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const petId = req.params.id;
      const pet = await petsModel.findById(petId);
      res.status(200).json({ message: "getById", status: "ok", pet });
    } catch (err) {
      res.status(500).json({ message: "getById", status: "error" });
    }
  }
}

export default new PetsController();
