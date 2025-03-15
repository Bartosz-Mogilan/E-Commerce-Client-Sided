import express from "express";
import { getAllOrders, getOrderById } from "../controllers/ordersController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, getAllOrders);
router.get("/:id", ensureAuthenticated, getOrderById);

export default router;
