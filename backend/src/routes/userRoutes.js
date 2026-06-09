import { Router } from "express";
import {
  getUserById,
  getUsers,
  inviteUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.get("/", authenticate, authorize("users:read"), getUsers);
router.post("/invite", authenticate, authorize("users:create"), inviteUser);
router.get("/:id", authenticate, authorize("users:read"), getUserById);
router.put("/:id", authenticate, authorize("users:update"), updateUser);
export default router;
