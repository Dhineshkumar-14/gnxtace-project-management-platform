import { Router } from "express";

import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/projectController.js";

const router = Router();

router.get("/", authenticate, authorize("projects:read"), getProjects);

router.post("/", authenticate, authorize("projects:create"), createProject);

router.put("/:id", authenticate, authorize("projects:update"), updateProject);

router.get(
  "/:id",
  authenticate,
  authorize("projects:read"),
  getProjectById,
);

export default router;
