import { Router } from "express";
import adminController from "../controllers/admin.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("admin"),
  adminController.getDashboardStats
);

export default router;
