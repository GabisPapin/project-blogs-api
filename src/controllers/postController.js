const postService = require('../services/postService');

const createPost = async (req, res) => {
  const authPost = await postService.postAuth(req.body);

  if (authPost.code) return res.status(authPost.code).json(authPost.message);

  const post = await postService.createPost(req.user, req.body);

  if (post.code) return res.status(post.code).json(post.message);

  return res.status(201).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { data } = req.user;

  const post = await postService.updatePost(id, data.id, req.body);

  if (post.code) return res.status(post.code).json(post.message);

  const postId = await postService.getById(post);

  return res.status(200).json(postId);
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

const removePost = async (req, res) => {
  const { id } = req.params;
  const { data } = req.user;

  const removed = await postService.removePost(id, data.id);

  if (removed.code) {
    return res.status(removed.code).json(removed.message);
  }

  return res.status(204).end();
};

const postSearch = async (req, res) => {
  const { q } = req.query;
  const search = await postService.postSearch(q);

  return res.status(200).json(search);
};

module.exports = {
  createPost,
  getAll,
  updatePost,
  getById,
  removePost,
  postSearch,
};