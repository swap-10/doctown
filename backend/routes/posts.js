const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/posts/:postId
// Get a single post by id
router.get('/:postId', postController.getPostById);

// POST /api/posts
// Create a new post
router.post('/:postId', authMiddleware.authMiddleware, postController.getPostById);

// PUT /api/posts/:postId
// Update a post by postId
router.put('/:postId', authMiddleware.authMiddleware, postController.updatePostById);

// DELETE /api/posts/:postId
// Delete a post by id
router.delete('/:postId', authMiddleware.authMiddleware, postController.deletePostById);

module.exports = router;