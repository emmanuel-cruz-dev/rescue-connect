import { Router } from "express";
import petsController from "../controllers/pets.controller";
import { validate } from "../middlewares/validate.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {
  createPetSchema,
  updatePetSchema,
  petIdSchema,
  deleteImageSchema,
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
  "/:id/images",
  authenticate,
  authorize("admin"),
  validate(petIdSchema),
  upload.array("images", 5),
  petsController.uploadImages
);
router.delete(
  "/:id/images/:publicId",
  authenticate,
  authorize("admin"),
  validate(deleteImageSchema),
  petsController.deleteImage
);
router.post(
  "/:id/adopt",
  authenticate,
  validate(petIdSchema),
  petsController.adopt
);

export default router;
