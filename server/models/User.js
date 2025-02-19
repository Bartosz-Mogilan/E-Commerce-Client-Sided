const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        minlength: 3,
        maxlength: 30 
    },
    password: { 
        type: String, 
        required: function() { return !this.googleId; } 
    },
    googleId: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    email: { 
        type: String, 
        unique: true, 
        sparse: true,
        validate: {
            validator: (v) => /\S+@\S+\.\S+/.test(v),
            message: 'Invalid email format'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

