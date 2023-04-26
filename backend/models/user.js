const mongoose = require('mongoose');

// the schema describing each of the documents in a collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'healthcare professional'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: "I'm using doctown!"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId }]
}, {timestamps: true});

// a document in the collection
const User = mongoose.model('User', userSchema);

module.exports = User;