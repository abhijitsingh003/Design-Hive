const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

// @desc    Create new post
// @route   POST /posts
const createPost = async (req, res) => {
    try {
        const { content } = req.body;

        let imagePath = '';
        if (req.file) {
            imagePath = req.file.path; // Cloudinary returns the full URL in req.file.path
        }

        if (!content && !imagePath) {
            req.flash('error', 'Post must contain either text or an image.');
            return res.redirect('/dashboard');
        }

        await Post.create({
            content,
            image: imagePath,
            user: req.user.userId,
        });

        req.flash('success', 'Post created successfully!');
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to create post.');
        res.redirect('/dashboard');
    }
};

// @desc    Update a post
// @route   PUT /posts/:id
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            req.flash('error', 'Post not found');
            return res.redirect('/dashboard');
        }

        // Check ownership
        if (post.user.toString() !== req.user.userId) {
            req.flash('error', 'Not authorized to update this post');
            return res.redirect('/dashboard');
        }

        const { content } = req.body;
        post.content = content || post.content;

        await post.save();

        req.flash('success', 'Post updated successfully!');
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to update post.');
        res.redirect('/dashboard');
    }
};

// @desc    Delete a post
// @route   DELETE /posts/:id
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            req.flash('error', 'Post not found');
            return res.redirect('/dashboard');
        }

        // Check ownership
        if (post.user.toString() !== req.user.userId) {
            req.flash('error', 'Not authorized to delete this post');
            return res.redirect('/dashboard');
        }

        // We no longer delete from the local filesystem because images are on Cloudinary.
        // Optional: Add Cloudinary deletion logic here using cloudinary.uploader.destroy()
        // if you want to also remove the image from your Cloudinary account.

        await post.deleteOne();

        req.flash('error', 'Post deleted successfully!');
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to delete post.');
        res.redirect('/dashboard');
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost
};
