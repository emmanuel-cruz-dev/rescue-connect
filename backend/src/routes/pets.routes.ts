import { Router } from "express";
import petsController from "../controllers/pets.controller";
import { validate } from "../middlewares/validate.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createPetSchema,
  updatePetSchema,
  petIdSchema,
} from "../validators/pet.validator";

const router = Router();

router.get("/", petsController.getAll);
router.get("/:id", validate(petIdSchema), petsController.getById);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createPetSchema),
  petsController.create
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(updatePetSchema),
  petsController.update
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(petIdSchema),
  petsController.delete
);
router.post(
  "/:id/adopt",
  authenticate,
  validate(petIdSchema),
  petsController.adopt
);

export default router;
