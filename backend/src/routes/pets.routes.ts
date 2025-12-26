import express from "express";
import petsController from "../controllers/pets.controller";

const router = express.Router();

router
  .post("/", petsController.create)
  .get("/:id", petsController.getById)
  .get("/", petsController.getAll)
  .put("/:id", petsController.update)
  .delete("/:id", petsController.delete);

export default router;
