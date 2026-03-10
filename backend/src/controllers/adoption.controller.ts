import { Request, Response, NextFunction } from "express";
import adoptionModel from "../models/adoption.model";
import { AdoptionStatus, IAdoptionQueryParams } from "../types";

class AdoptionController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query as unknown as IAdoptionQueryParams;
      const result = await adoptionModel.getAll(queryParams);

      res.status(200).json({
        status: "success",
        data: result.data,
        pagination: result.pagination,
      });
    } catch (err) {
      next(err);
    }
  }

  async createRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { petId } = req.params;
      const { message } = req.body;

      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "No autenticado",
        });
      }

      const request = await adoptionModel.createRequest(
        petId,
        req.user.userId,
        message
      );

      res.status(201).json({
        status: "success",
        message: "Solicitud de adopción creada exitosamente",
        data: { request },
      });
    } catch (err) {
      next(err);
    }
  }

  async getMyRequests(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "No autenticado",
        });
      }

      const { status } = req.query;

      const requests = await adoptionModel.getUserRequests(
        req.user.userId,
        status as AdoptionStatus
      );

      res.status(200).json({
        status: "success",
        data: { requests },
        count: requests.length,
      });
    } catch (err) {
      next(err);
    }
  }

  async getPetRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const { petId } = req.params;

      const requests = await adoptionModel.getPetRequests(petId);

      res.status(200).json({
        status: "success",
        data: { requests },
        count: requests.length,
      });
    } catch (err) {
      next(err);
    }
  }

  async getRequestById(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestId } = req.params;

      const request = await adoptionModel.getRequestById(requestId);

      res.status(200).json({
        status: "success",
        data: { request },
      });
    } catch (err) {
      next(err);
    }
  }

  async approveRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestId } = req.params;
      const { adminNotes } = req.body;

      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "No autenticado",
        });
      }

      const request = await adoptionModel.approveRequest(
        requestId,
        req.user.userId,
        adminNotes
      );

      res.status(200).json({
        status: "success",
        message: "Solicitud aprobada exitosamente",
        data: { request },
      });
    } catch (err) {
      next(err);
    }
  }

  async rejectRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestId } = req.params;
      const { adminNotes } = req.body;

      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "No autenticado",
        });
      }

      const request = await adoptionModel.rejectRequest(
        requestId,
        req.user.userId,
        adminNotes
      );

      res.status(200).json({
        status: "success",
        message: "Solicitud rechazada",
        data: { request },
      });
    } catch (err) {
      next(err);
    }
  }

  async cancelRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestId } = req.params;

      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "No autenticado",
        });
      }

      const request = await adoptionModel.cancelRequest(
        requestId,
        req.user.userId
      );

      res.status(200).json({
        status: "success",
        message: "Solicitud cancelada",
        data: { request },
      });
    } catch (err) {
      next(err);
    }
  }

  async getMonthlyStats(req: Request, res: Response, next: NextFunction) {
    try {
      const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
      const stats = await adoptionModel.getMonthlyStats(year);

      res.status(200).json({
        status: "success",
        data: stats,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new AdoptionController();
