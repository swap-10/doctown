const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, "Please add a title to the post"],
        maxlength: [100, "Title cannot be more than 100 chars"]
    },
    content: {
        type: String,
        required: true,
    },
    media: {
        type: String  // can be a URL or path to file on server
    },
    mediaType: {
        type: String  // 'image', 'audio', or 'video'
    },
    caption: {
        type: String
    },
    comments: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
}, {timestamps: true});

const Post  = mongoose.model('Post', postSchema);

module.exports = Post;