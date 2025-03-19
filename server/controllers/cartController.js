import pool from "../config/db.js";

// Add an item to the cart
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

// Get all cart items
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

