import "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./swaggerOptions.js";
import passport from "./config/passport.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({ 
  origin: process.env.FRONTEND_URL, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(passport.initialize());

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import checkoutRoutes from "./routes/checkout.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/checkout", checkoutRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API");
});

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if(process.env.NODE_ENV !== "test") {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

export default app;



