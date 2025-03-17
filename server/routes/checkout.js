import express from "express";
import { createPaymentIntent, confirmCheckout } from "../controllers/checkoutController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/payment-intent", ensureAuthenticated, createPaymentIntent);
router.post("/confirm", ensureAuthenticated, confirmCheckout);

export default router;




