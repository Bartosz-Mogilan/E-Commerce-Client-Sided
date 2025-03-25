import stripePackage from "stripe";
import pool from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: API endpoints for checkout and payment processing
 */

/**
 * @swagger
 * /api/v1/checkout/payment-intent:
 *   post:
 *     summary: Create a Stripe payment intent
 *     description: Calculate the total price from the user's cart and create a Stripe payment intent.
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment intent created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *       404:
 *         description: Cart is empty.
 *       500:
 *         description: Error creating payment intent.
 */
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

/**
 * @swagger
 * /api/v1/checkout/confirm:
 *   post:
 *     summary: Confirm the checkout process
 *     description: Create an order from the user's cart items, move the items to the order, and clear the cart.
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout confirmed and order created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *       404:
 *         description: Cart is empty.
 *       500:
 *         description: Error confirming checkout.
 */
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

