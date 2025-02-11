const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('./User');
const jwt = require('jsonwebtoken');

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

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        
        try{
            const user = await User.findOne({ username });
            if(!user) {
                return res.status(400).json({error: 'Invalid Credentials'});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials'});
            }

            const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
            return res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error : 'Server error'});
        }
    })
});

module.exports = router;
