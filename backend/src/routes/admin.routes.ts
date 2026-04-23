import { Router } from "express";

import { adminController } from "../controllers";
import { authenticate, authorize } from "../middlewares";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("admin"),
  adminController.getDashboardStats
);

export default router;
