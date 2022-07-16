// model - blogPost.js
const models = require('../database/models');

const getAll = async () => {
  const getPost = await models.BlogPost.findAll({
    include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
});

  return getPost;
};

const getById = async (id) => {
  const postId = await models.BlogPost.findByPk(id, {
    include: [
      { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  if (!postId) return { code: 404, message: { message: 'Post does not exist' } };

  return postId;
};

module.exports = {
  getAll,
  getById,
};