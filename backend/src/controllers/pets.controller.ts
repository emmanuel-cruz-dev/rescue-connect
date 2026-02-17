import { Request, Response, NextFunction } from "express";
import petsModel from "../models/pets.model";
import { IPetQueryParams } from "../types/pet.types";

class PetsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query as unknown as IPetQueryParams;
      const result = await petsModel.getAll(queryParams);

      res.status(200).json({
        status: "success",
        data: result.data,
        pagination: result.pagination,
      });
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

  async uploadImages(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "No se han proporcionado imágenes",
        });
      }

      const pet = await petsModel.uploadPetImages(id, req.files);

      res.status(200).json({
        status: "success",
        message: `${req.files.length} imagen(es) subida(s) exitosamente`,
        data: { pet },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, publicId } = req.params;

      const pet = await petsModel.deletePetImage(id, publicId);

      res.status(200).json({
        status: "success",
        message: "Imagen eliminada exitosamente",
        data: { pet },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new PetsController();
