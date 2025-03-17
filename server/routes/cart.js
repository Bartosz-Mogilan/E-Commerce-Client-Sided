import express from "express";
import { addCartItem, getCart } from "../controllers/cartController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, getCart);
router.post("/", ensureAuthenticated, addCartItem);

export default router;


