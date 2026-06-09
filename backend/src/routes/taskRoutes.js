import { Router } from "express";

import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = Router();

router.get("/", authenticate, authorize("tasks:read"), getTasks);
router.post("/", authenticate, authorize("tasks:create"), createTask);
router.put("/:id", authenticate, authorize("tasks:update"), updateTask);
router.patch(
  "/:id/status",
  authenticate,
  authorize("tasks:update"),
  updateTaskStatus,
);
export default router;
