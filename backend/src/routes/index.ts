import "../docs/swagger";
import "../docs/routes.swagger";

import express from "express";
import petsRouter from "./pets.routes";
import authRouter from "./auth.routes";
import adoptionRouter from "./adoption.routes";
import { swaggerUiHandler, swaggerUiServe } from "../docs/swagger";

const router = express();

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "available",
    timestamp: new Date().toISOString().split("T")[0],
  });
});

router.use("/docs", swaggerUiServe, swaggerUiHandler);
router.use("/auth", authRouter);
router.use("/pets", petsRouter);
router.use("/adoptions", adoptionRouter);

export default router;
