import pool from "../config/db.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE user_id = $1", [req.user.id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Error retrieving orders" });
  }
};

// Get an order by ID 
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    const order = result.rows[0];
    if (order.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ error: "Error retrieving order" });
  }
};

