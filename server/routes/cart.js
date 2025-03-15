import express from "express";
import { createCartItem, getCartById, checkoutCart } from "../controllers/cartController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/", ensureAuthenticated, createCartItem);
router.get("/:cartId", ensureAuthenticated, getCartById);
router.post("/:cartId/checkout", ensureAuthenticated, checkoutCart);

export default router;

