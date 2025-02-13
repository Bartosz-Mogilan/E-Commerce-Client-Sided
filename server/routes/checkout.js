const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Creating an checkout

router.post('/checkout', async (req, res) => {
    const { amount } = req.body;

    if(!process.env.STRIPE_SECRET_KEY) {
        console.error('STRIPE_SECRET_KEY is missing in .env');
        return res.status(500).json({error: 'Payment system error'});
    }

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'gbp',
        });
        
        res.status(200).json({ clientSecret: payment.client_secret});
    } catch (error) {
        console.error('Error creating a payment' , error);
        res.status(500).json({ error: error.message});
    }
});

module.exports = router;