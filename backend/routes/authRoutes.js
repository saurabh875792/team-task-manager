import express from "express";
import { signup, login, getUsers } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/users", authMiddleware, getUsers);

export default router;