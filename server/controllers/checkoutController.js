import stripePackage from "stripe";
import pool from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

// Creating a Stripe payment intent for the cart
export const createPaymentIntent = async (req, res) => {
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
    let totalPrice = cartItem.quantity * parseFloat(cartItem.price);
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

// Confirm checkout after successful payment
export const confirmCheckout = async (req, res) => {
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
    let totalPrice = cartItem.quantity * parseFloat(cartItem.price);
    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *",
      [req.user.id, totalPrice]
    );
    await pool.query("DELETE FROM carts WHERE id = $1", [cartId]);
    res.status(200).json({ message: "Checkout confirmed and order created", order: orderResult.rows[0] });
  } catch (error) {
    console.error("Error confirming checkout:", error);
    res.status(500).json({ error: "Error confirming checkout" });
  }
};

