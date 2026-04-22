import { Request, Response, NextFunction } from "express";

import { notificationModel } from "../models";

class NotificationController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ status: "error", message: "No autenticado" });
      }
      const notifications = await notificationModel.getByUser(req.user.userId);
      res.status(200).json({
        status: "success",
        data: { notifications },
        count: notifications.length,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUnreadCount(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ status: "error", message: "No autenticado" });
      }
      const count = await notificationModel.getUnreadCount(req.user.userId);
      res.status(200).json({ status: "success", data: { count } });
    } catch (err) {
      next(err);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ status: "error", message: "No autenticado" });
      }
      const { id } = req.params;
      const notification = await notificationModel.markAsRead(
        id,
        req.user.userId
      );
      if (!notification) {
        return res
          .status(404)
          .json({ status: "error", message: "Notificación no encontrada" });
      }
      res.status(200).json({ status: "success", data: { notification } });
    } catch (err) {
      next(err);
    }
  }

  async markAllAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ status: "error", message: "No autenticado" });
      }
      await notificationModel.markAllAsRead(req.user.userId);
      res.status(200).json({
        status: "success",
        message: "Todas las notificaciones marcadas como leídas",
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ status: "error", message: "No autenticado" });
      }
      const { id } = req.params;
      const notification = await notificationModel.delete(id, req.user.userId);
      if (!notification) {
        return res
          .status(404)
          .json({ status: "error", message: "Notificación no encontrada" });
      }
      res.status(200).json({
        status: "success",
        message: "Notificación eliminada",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new NotificationController();
