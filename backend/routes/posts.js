const express = require('express');
const Post = require('../models/posts');
const User = require('../models/user');
const router = express.Router();


router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
    console.log (posts);
  } catch (err) {
    console.error(err);
    console.log('error getting posts..')
  }

});


router.post('/posts', async (req, res) => {
  try {
    const { authorId, content } = req.body;
    const post = await Post.create({ author: authorId, content });
    res.json(post);
  } catch (err) {
    console.error(err);
    console.log('error creating post..');
  }

});


router.get('/user/:id', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });
    res.json(posts);
  }catch (err) {
    console.error(err);
    console.log('error getting user profile..')
  }
  
});

module.exports = router;
