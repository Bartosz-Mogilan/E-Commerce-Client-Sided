import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/usersController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, getAllUsers);
router.get("/:id", ensureAuthenticated, getUserById);
router.put("/:id", ensureAuthenticated, updateUser);

export default router;
