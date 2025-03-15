import pool from "../config/db.js";

// Create a cart item
export const createCartItem = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id; // take from JWT
  if (!product_id || !quantity) {
    return res.status(400).json({ error: "Product id and quantity are required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, product_id, quantity]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating cart item:", error);
    res.status(500).json({ error: "Error creating cart item" });
  }
};

// Getting cart item based on ID
export const getCartById = async (req, res) => {
  const { cartId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM carts WHERE id = $1", [cartId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }
    if (result.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ error: "Error retrieving cart" });
  }
};

// Checkout the cart
export const checkoutCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cartResult = await pool.query(
      `SELECT c.*, p.price
       FROM carts c
       JOIN products p ON c.product_id = p.id
       WHERE c.id = $1`,
      [cartId]
    );
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const cartItem = cartResult.rows[0];
    if (cartItem.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    let total_price = cartItem.quantity * parseFloat(cartItem.price);
    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *",
      [req.user.id, total_price]
    );
    await pool.query("DELETE FROM carts WHERE id = $1", [cartId]);
    res.status(200).json({ message: "Checkout successful", order: orderResult.rows[0] });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Error during checkout" });
  }
};
