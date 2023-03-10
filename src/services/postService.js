// model - blogPost.js
const joi = require('joi');
const { Op } = require('sequelize');
const models = require('../database/models');

const postAuth = (payload) => {
  const schema = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    categoryIds: joi.array().required(),
  });

  const auth = schema.validate(payload);

  const { error, value } = auth;

  if (error) return { code: 400, message: { message: 'Some required fields are missing' } };

  return value;
};

const createPost = async (user, result) => {
  const { title, content, categoryIds } = result;

  const categories = await models.Category.findAll({ where: { id: categoryIds } });

  if (categories.length < 1) {
    return { code: 400, message: { message: '"categoryIds" not found' } };
  }

  const newPost = await models.BlogPost.create({
    title,
    content,
    userId: user.data.id,
  });

  const allPosts = categoryIds.map((categoryId) => ({
    postId: newPost.id, categoryId,
  }));

  await models.PostCategory.bulkCreate(allPosts);

  return newPost;
};

const updatePost = async (id, user, payload) => {
  const { title, content } = payload;
  const schema = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
  });

  const auth = schema.validate(payload);

  if (auth.error) return { code: 400, message: { message: 'Some required fields are missing' } };

  const findId = await models.BlogPost.findOne({ where: { id }, raw: true });
  if (findId.userId !== user) return { code: 401, message: { message: 'Unauthorized user' } }; 

  const [updated] = await models.BlogPost.update({ 
    title, 
    content,
   },
   {
    where: { id: Number(id) },
   });

   return updated;
};

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

const removePost = async (id, user) => {
  const findId = await models.BlogPost.findOne({ where: { id }, raw: true });

  if (!findId) return { code: 404, message: { message: 'Post does not exist' } };

  if (findId.userId !== user) return { code: 401, message: { message: 'Unauthorized user' } };

  const removed = await models.BlogPost.destroy({ 
    where: { id: findId.id },
    raw: true,
  });
 
  return removed;
};

const postSearch = async (query) => {
  const search = await models.BlogPost.findAll({
    include: [
    { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
    { model: models.Category, as: 'categories', through: { attributes: [] } },
  ], 
  where: { [Op.or]: [
    { title: { [Op.substring]: query } },
    { content: { [Op.substring]: query } },
] },
  });

  return search;
};

module.exports = {
  postAuth,
  createPost,
  updatePost,
  getAll,
  getById,
  removePost,
  postSearch,
};