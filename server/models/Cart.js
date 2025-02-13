const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true },
    quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { cartItemSchema },
    status: { type: 'String', default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);