import express from "express";
import { register, login } from "../controllers/authController.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Google OAuth endpoints
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

export default router;

