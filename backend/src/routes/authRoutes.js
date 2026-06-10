import { Router } from "express";

import {
  getCurrentUser,
  login,
  logout,
  refreshToken,
} from "../controllers/authController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

import {
  loginSchema,
  refreshTokenSchema,
} from "../validations/authValidation.js";

const router = Router();

router.post("/login", validate(loginSchema), login);

router.post("/refresh", validate(refreshTokenSchema), refreshToken);

router.post("/logout", authenticate, logout);

router.get("/me", authenticate, getCurrentUser);

export default router;
