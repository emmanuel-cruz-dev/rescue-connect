import { Router } from "express";
import usersController from "../controllers/users.controller";
import { validate } from "../middlewares/validate.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createUserSchema,
  updateUserSchema,
  updatePasswordSchema,
  userIdSchema,
  getUsersSchema,
} from "../validators/user.validator";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("admin"),
  validate(getUsersSchema),
  usersController.getAll
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(userIdSchema),
  usersController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createUserSchema),
  usersController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(updateUserSchema),
  usersController.update
);

router.patch(
  "/:id/password",
  authenticate,
  validate(updatePasswordSchema),
  usersController.updatePassword
);

router.patch(
  "/:id/deactivate",
  authenticate,
  authorize("admin"),
  validate(userIdSchema),
  usersController.deactivate
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(userIdSchema),
  usersController.delete
);

export default router;
