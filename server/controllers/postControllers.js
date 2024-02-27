const Post = require("../models/Post");

class PostControllers {
  async createPost(req, res, next) {
    const { user, content } = req.body;

    try {
      const post = new Post({ user, content });
      await post.save();
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async getPosts(req, res, next) {
    try {
      const posts = await Post.find().populate("user");
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    const postId = req.params.id;
    try {
      const post = await Post.findById(postId);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    const postId = req.params.id;
    const { content } = req.body;

    try {
      const post = await Post.findByIdAndUpdate(postId, { content }, { new: true });
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    const postId = req.params.id;
    try {
      await Post.findByIdAndDelete(postId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostControllers();
