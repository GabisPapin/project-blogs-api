const postService = require('../services/postService');

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
  getAll,
  getById,
};