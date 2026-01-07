import { Router } from "express";
import adoptionController from "../controllers/adoption.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createAdoptionRequestSchema,
  reviewAdoptionRequestSchema,
  adoptionRequestIdSchema,
} from "../validators/adoption.validator";

const router = Router();

router.post(
  "/pets/:petId/request",
  authenticate,
  validate(createAdoptionRequestSchema),
  adoptionController.createRequest
);
router.get("/my-requests", authenticate, adoptionController.getMyRequests);
router.patch(
  "/requests/:requestId/cancel",
  authenticate,
  validate(adoptionRequestIdSchema),
  adoptionController.cancelRequest
);

router.get(
  "/requests",
  authenticate,
  authorize("admin"),
  adoptionController.getAllRequests
);
router.get(
  "/requests/:requestId",
  authenticate,
  authorize("admin"),
  validate(adoptionRequestIdSchema),
  adoptionController.getRequestById
);
router.get(
  "/pets/:petId/requests",
  authenticate,
  authorize("admin"),
  adoptionController.getPetRequests
);
router.patch(
  "/requests/:requestId/approve",
  authenticate,
  authorize("admin"),
  validate(reviewAdoptionRequestSchema),
  adoptionController.approveRequest
);
router.patch(
  "/requests/:requestId/reject",
  authenticate,
  authorize("admin"),
  validate(reviewAdoptionRequestSchema),
  adoptionController.rejectRequest
);

export default router;
