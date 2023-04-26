const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Create new user
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ 'message': 'User created', token })
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error'});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        
        // User exists
        // Verify password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials: incorrect password'});
        }

        // Password verified
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);

        res.json({ message: 'Logged in', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error'});
    }
};

module.exports = { signup, login };