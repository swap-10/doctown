const Post = require('../models/post');
const User = require('../models/user');

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('author', '-password');
        if (!post) {
            return res.status(404).json({ message: "Post not found"} );
        }

        res.json(post);
    } catch(err) {
        res.status(500).json({ message: err.message} );
    }
};

const createPost = async (req, res) => {
    try {
        const { title, content, media, mediaType, caption } = req.body;
        const author = req.user._id;

        const newPost = new Post({
            author,
            title,
            content,
            media,
            mediaType,
            caption
        });

        await newPost.save();
        await User.findByIdAndUpdate(author, { $push: {posts: newPost._id } });

        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatePostById = async (req, res) => {
    try {
        const { title, content, media, mediaType, caption } = req.body;
        const postId = req.params.postId;
        const author = req.user._id;
    
        const post = await Post.findById(req.params.postId).populate('author', '-password');
        if (!post) {
            return res.status(404).json( { message: "Post not found" });
        }

        // Check if authenticated user is author of the post
        if (post.author._id.toString() !== req.user._id.toString()) {
            return res.status(401).json( { message: "Unauthorized" });
        }
    
        post.title = title || post.title;
        post.content = content || post.content;
        post.media = media || post.media;
        post.mediaType = mediaType || post.mediaType;
        post.caption = caption || post.caption;
    
        await post.save();
        res.staus(200).json(post);
    } catch (err) {
        res.status(500).json( {message: err.message });
    }
}

const deletePostById = async (req, res) => {
    try {
        const postId = req.params.postId;
        const author = req.user._id;

        const post = await Post.findById(req.params.postId).populate('author', '-password');
        if (!post) {
            return res.status(404).json( { message: "Post not found" });
        }

        // Check if authenticated user is author of the post
        if (post.author._id.toString() !== req.user._id.toString()) {
            return res.status(401).json( { message: "Unauthorized" });
        }

        await post.remove();
        await User.findByIdAndUpdate(post.author._id, { $pill: { posts: post.id } });

        return res.status(200).json({ success: true, message: "Post deleted successfully"});
    } catch (err) {
        return res.status(500).json({success: false, error: err.message});
    }
}

module.exports = {getPostById, createPost, updatePostById, deletePostById};