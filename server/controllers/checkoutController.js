import stripePackage from "stripe";
import pool from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

// Create a Stripe payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const cartResult = await pool.query(
      `SELECT c.quantity, p.price
       FROM carts c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [req.user.id]
    );
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ error: "Cart is empty" });
    }
    const totalPrice = cartResult.rows.reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.price);
    }, 0);
    const amountInPence = Math.round(totalPrice * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPence,
      currency: "gbp",
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Error creating payment intent" });
  }
};

// Confirm checkout
export const confirmCheckout = async (req, res) => {
  try {
    const cartResult = await pool.query(
      `SELECT c.*, p.price
       FROM carts c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [req.user.id]
    );
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ error: "Cart is empty" });
    }
    const totalPrice = cartResult.rows.reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.price);
    }, 0);

    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, totalPrice, "completed"]
    );
    const orderId = orderResult.rows[0].id;

    for (const item of cartResult.rows) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await pool.query("DELETE FROM carts WHERE user_id = $1", [req.user.id]);

    res.status(200).json({ message: "Checkout confirmed and order created", order: orderResult.rows[0] });
  } catch (error) {
    console.error("Error confirming checkout:", error);
    res.status(500).json({ error: "Error confirming checkout" });
  }
};

