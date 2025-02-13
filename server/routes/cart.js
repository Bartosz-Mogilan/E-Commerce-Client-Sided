const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { ensureAuthenticated } = require('./auth');

//Active cart for user

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id, status: 'active' }).populate('items.product');
        if(!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error'});
    }
});

//Add product to cart

router.post('/add', ensureAuthenticated, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user.id, status: 'active '});
        if(!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if(existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({ product: productId, quantity: quantity || 1});
        }
        await cart.save();
        res.json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error'});
    }
});

//Removing a product from the cart 

router.post('/remove', ensureAuthenticated, async (req, res) => {
    const { productId } = req.body;
    try {
        const cart = await Cart.findOne({ user: req.user.id, status: 'active '});
        if(!cart) {
            return res.status(400).json({ error: 'Cart not found'});
        }
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.json({ message: 'Product removed from cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//Checking out cart 

/*router.post('/checkout', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id, status: 'active' });
        if(!cart) {
            return res.status(400).json({ error: 'No active cart to checkout'});
        }
        cart.status = 'completed';
        await cart.save();
        res.json({ message: 'Checkout successful', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error'});
    }
}); */

module.exports = router;