import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};

