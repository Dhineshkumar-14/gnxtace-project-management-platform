import { Router } from "express";

import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { getTasks } from "../controllers/taskController.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("tasks:read"),
  getTasks,
);

export default router;
