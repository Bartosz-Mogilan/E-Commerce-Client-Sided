const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const ensureAuthenticated = require('../middleware/auth');

//Getting order history

router.get('/', ensureAuthenticated, async (req, res) => {

    try {
        const orders = await Cart.find({
            user: req.user.id,
            status: 'completed'
        }).populate('items.product');

        res.json(orders);
    } catch (error) {
        console.error('Error fetching order history: ', error);
        res.status(500).json({ error: 'Server error'});
    }
});

module.exports = router;

