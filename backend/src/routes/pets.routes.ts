import express from "express";
import petsController from "../controllers/pets.controller";

const router = express.Router();

router
  .get("/", petsController.getAll)
  .get("/:id", petsController.getById)
  .post("/", petsController.create)
  .put("/:id", petsController.update)
  .delete("/:id", petsController.delete);

export default router;
