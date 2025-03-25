import pool from "../config/db.js";

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API for managing shopping cart items
 */

/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: Add an item to the cart
 *     description: Add or update the quantity of a product in the user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Error adding item to cart.
 */
export const addCartItem = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;
  if (!product_id || !quantity) {
    return res.status(400).json({ error: "Product id and quantity are required." });
  }
  try {
    const existing = await pool.query("SELECT * FROM carts WHERE user_id = $1 AND product_id = $2", [user_id, product_id]);
    if (existing.rows.length > 0) {
      const updated = await pool.query(
        "UPDATE carts SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
        [quantity, existing.rows[0].id]
      );
      return res.status(200).json(updated.rows[0]);
    } else {
      const result = await pool.query(
        "INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [user_id, product_id, quantity]
      );
      return res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error adding cart item:", error);
    res.status(500).json({ error: "Error adding cart item" });
  }
};

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get all cart items for the authenticated user
 *     description: Retrieve all items in the authenticated user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error retrieving cart items.
 */
export const getCart = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, p.name, p.description, p.price, p.imageUrl
       FROM carts c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [req.user.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ error: "Error retrieving cart" });
  }
};


