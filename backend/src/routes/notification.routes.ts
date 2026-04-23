import { Router } from "express";

import { notificationController } from "../controllers";
import { authenticate } from "../middlewares";

const router = Router();

router.use(authenticate);
router.get("/", notificationController.getAll);
router.get("/unread-count", notificationController.getUnreadCount);
router.patch("/read-all", notificationController.markAllAsRead);
router.patch("/:id/read", notificationController.markAsRead);
router.delete("/:id", notificationController.delete);

export default router;
