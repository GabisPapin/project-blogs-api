const postService = require('../services/postService');

const getAll = async (_req, res) => {
  const post = await postService.getAll();
  return res.status(200).json(post);
};

module.exports = {
  getAll,
};