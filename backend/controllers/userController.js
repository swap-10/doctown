const User = require('../models/user');

// getProfile function
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
    }
};

// updateProfile function
const updateProfile = async (req, res) => {
    const { name, email, bio } = req.body;

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (email) profileFields.email = email;
    if (bio) profileFields.bio = bio;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "Your account was not found. Please raise an issue"});
        }

        // update profile
        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields},
            { new: true }
        );

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
    }
}

module.exports = {getProfile, updateProfile};