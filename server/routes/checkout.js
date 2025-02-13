const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Creating an checkout

router.post('./checkout', async (req, res) => {
    const { amount } = req.body;
    try {
        const payment = await stripe.payment.create({
            amount,
            currency: 'gdp',
        });
        res.status(200).json({ clientSecret: payment.client_secret});
    } catch (error) {
        console.error('Error creating a payment' , error);
        res.status(500).json({ error: error.message});
    }
});

module.exports = router;