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

module.exports = {
  getAll,
};