import { Router } from "express";

import {
  deactivateUser,
  getUserById,
  getUsers,
  inviteUser,
  updateUser,
  updateUserRoles,
} from "../controllers/userController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.js";

import {
  inviteUserSchema,
  updateUserSchema,
  updateUserRolesSchema,
} from "../validations/userValidation.js";

const router = Router();

router.get("/", authenticate, authorize("users:manage"), getUsers);

router.post(
  "/invite",
  authenticate,
  authorize("users:manage"),
  validate(inviteUserSchema),
  inviteUser,
);

router.get("/:id", authenticate, authorize("users:manage"), getUserById);
router.put(
  "/:id/roles",
  authenticate,
  authorize("users:manage"),
  validate(updateUserRolesSchema),
  updateUserRoles,
);

router.put(
  "/:id",
  authenticate,
  authorize("users:manage"),
  validate(updateUserSchema),
  updateUser,
);

router.delete("/:id", authenticate, authorize("users:manage"), deactivateUser);

export default router;
