import { Router } from "express";

import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  getProjectStats,
  updateProject,
} from "../controllers/projectController.js";
import { validate } from "../middleware/validate.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validations/projectValidation.js";

const router = Router();

router.get("/", authenticate, authorize("projects:read"), getProjects);

router.post("/", authenticate, validate(createProjectSchema), createProject);

router.put("/:id", authenticate, validate(updateProjectSchema), updateProject);

router.get("/:id", authenticate, authorize("projects:read"), getProjectById);

router.delete(
  "/:id",
  authenticate,
  authorize("projects:delete"),
  deleteProject,
);

router.get(
  "/:id/stats",
  authenticate,
  authorize("projects:read"),
  getProjectStats,
);

export default router;
