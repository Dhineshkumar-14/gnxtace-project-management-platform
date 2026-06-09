import { Router } from "express";

import * as projectController from "../controllers/projectController.js";

import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("projects:read"),
  projectController.getProjects,
);

export default router;
