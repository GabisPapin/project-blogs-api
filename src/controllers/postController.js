const postService = require('../services/postService');

const createPost = async (req, res) => {
  const authPost = await postService.postAuth(req.body);

  if (authPost.code) return res.status(authPost.code).json(authPost.message);

  const post = await postService.createPost(req.user, req.body);

  if (post.code) return res.status(post.code).json(post.message);

  return res.status(201).json(post);
};

const getAll = async (_req, res) => {
  const post = await postService.getAll();
  return res.status(200).json(post);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const postId = await postService.getById(id);

  if (postId.code) return res.status(postId.code).json(postId.message);

  return res.status(200).json(postId);
};

module.exports = {
  createPost,
  getAll,
  getById,
};