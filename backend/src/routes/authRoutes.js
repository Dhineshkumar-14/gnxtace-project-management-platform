import { Router } from "express";

import {
  getCurrentUser,
  login,
  logout,
  refreshToken,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/logout", authenticate, logout);
router.post("/refresh", refreshToken);
router.get("/me", authenticate, getCurrentUser);
export default router;
