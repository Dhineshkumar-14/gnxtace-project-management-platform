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

const router = Router();

router.get("/", authenticate, authorize("users:manage"), getUsers);

router.post("/invite", authenticate, authorize("users:manage"), inviteUser);

router.get("/:id", authenticate, authorize("users:manage"), getUserById);

router.put("/:id", authenticate, authorize("users:manage"), updateUser);

router.put(
  "/:id/roles",
  authenticate,
  authorize("users:manage"),
  updateUserRoles,
);

router.delete("/:id", authenticate, authorize("users:manage"), deactivateUser);

export default router;
