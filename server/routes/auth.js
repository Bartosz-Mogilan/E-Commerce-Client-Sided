const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');

require("./passport-setup");

const dotenv = require('dotenv');
dotenv.config();

//Registering a new user

router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(400).json({error : "Username already exists"});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, password: hashedPassword});
        await newUser.save();

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.status(201).json({ message: 'User registration successfull', token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error'});
    }
});

 //Logging in a user

 router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try{
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({error: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch === false) {
            return res.status(400).json({ error: 'Invalid credentials'});
        }

        req.session.user = { id: user.id, username: user.username};

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: 'Login successful', token });
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error : 'Server error'});
    }
});

//Using google for Third-Party Login

router.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }), (req, res) => {
        const token = jwt.sign({ id: req.user.id}, process.env.JWT_SECRET, { expiresIn: '1d'});

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production'});
        return res.json({ message: 'Google login successful' });
    }
);

//Logging out a user
router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next (err);
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Logged out successfully'});
    });
});


module.exports = router;
