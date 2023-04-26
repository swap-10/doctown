const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            res.status(401).json({ message: "Please authenticate"});
        }

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(500).send( { message: err.message});
    }
};

module.exports = {authMiddleware};