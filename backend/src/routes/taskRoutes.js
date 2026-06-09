import { Router } from "express";

import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = Router();

router.get("/", authenticate, authorize("tasks:read"), getTasks);
router.post("/", authenticate, authorize("tasks:create"), createTask);
router.put("/:id", authenticate, authorize("tasks:update"), updateTask);
export default router;
