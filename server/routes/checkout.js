import express from "express";
import { createPaymentIntent, confirmCheckout } from "../controllers/checkoutController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/:cartId", ensureAuthenticated, createPaymentIntent);
router.post("/:cartId/confirm", ensureAuthenticated, confirmCheckout);

export default router;



