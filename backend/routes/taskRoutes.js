import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);

// 🔥 sab user task create kar sakte hain
router.post("/", authMiddleware, createTask);

// 🔥 sab update kar sakte hain
router.put("/:id", authMiddleware, updateTask);

// 🔥 delete sirf admin karega
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteTask);

export default router;