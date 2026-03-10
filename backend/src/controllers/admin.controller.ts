import { Request, Response, NextFunction } from "express";
import adminModel from "../models/admin.model";

class AdminController {
  async getDashboardStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await adminModel.getDashboardStats();
      res.status(200).json({ status: "success", data: stats });
    } catch (err) {
      next(err);
    }
  }
}

export default new AdminController();
