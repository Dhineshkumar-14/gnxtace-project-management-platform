import { Router } from "express";

import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validations/taskValidation.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", authenticate, authorize("tasks:read"), getTasks);
router.post("/", authenticate, validate(createTaskSchema), createTask);

router.put("/:id", authenticate, validate(updateTaskSchema), updateTask);
router.patch(
  "/:id/status",
  authenticate,
  authorize("tasks:update"),
  updateTaskStatus,
);
router.get("/:id", authenticate, authorize("tasks:read"), getTaskById);
router.delete("/:id", authenticate, authorize("tasks:delete"), deleteTask);
export default router;
