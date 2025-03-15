import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", ensureAuthenticated, createProduct);
router.put("/:id", ensureAuthenticated, updateProduct);
router.delete("/:id", ensureAuthenticated, deleteProduct);

export default router;
