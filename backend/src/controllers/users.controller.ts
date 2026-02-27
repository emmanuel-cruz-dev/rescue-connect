import { Request, Response, NextFunction } from "express";
import usersModel from "../models/user.model";
import { IUserQueryParams } from "../types";

class UsersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query as unknown as IUserQueryParams;
      const result = await usersModel.getAll(queryParams);

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
      const user = await usersModel.findById(id);
      res.status(200).json({ status: "success", data: { user } });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await usersModel.create(req.body);
      res.status(201).json({ status: "success", data: { user: newUser } });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedUser = await usersModel.update(id, req.body);
      res.status(200).json({ status: "success", data: { user: updatedUser } });
    } catch (err) {
      next(err);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
      await usersModel.updatePassword(id, currentPassword, newPassword);
      res.status(200).json({
        status: "success",
        message: "Contraseña actualizada exitosamente",
      });
    } catch (err) {
      next(err);
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (req.user?.userId === id) {
        return res.status(400).json({
          status: "error",
          message: "No puedes desactivar tu propia cuenta",
        });
      }

      const user = await usersModel.deactivate(id);
      res.status(200).json({ status: "success", data: { user } });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (req.user?.userId === id) {
        return res.status(400).json({
          status: "error",
          message: "No puedes eliminar tu propia cuenta",
        });
      }

      const userToDelete = await usersModel.findById(id);

      if (!userToDelete) {
        return res.status(404).json({
          status: "error",
          message: "Usuario no encontrado",
        });
      }

      if (userToDelete.role === "admin") {
        const adminCount = await usersModel.count({ role: "admin" });

        if (adminCount <= 1) {
          return res.status(400).json({
            status: "error",
            message: "No se puede eliminar el último administrador",
          });
        }
      }

      await usersModel.delete(id);

      res.status(200).json({
        status: "success",
        message: "Usuario eliminado exitosamente",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
