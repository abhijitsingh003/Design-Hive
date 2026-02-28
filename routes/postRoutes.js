const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { createPost, updatePost, deletePost } = require('../controllers/postController');

// All post routes require authentication
router.use(protect);

// POST /posts -> Create a new post
router.post('/', upload.single('image'), createPost);

// PUT /posts/:id -> Update an existing post
router.put('/:id', updatePost);

// DELETE /posts/:id -> Delete a post
router.delete('/:id', deletePost);

module.exports = router;
