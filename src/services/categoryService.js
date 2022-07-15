const joi = require('joi');
const models = require('../database/models');

const categoryValid = (payload) => {
  const schema = joi.object({
    name: joi.string().required(),
  });

  const valid = schema.validate(payload);

  const { value } = valid;

  // if (error) return { code: 400, message: { message: '"name" is required' } };

  return value;
};

const createCategory = async ({ name }) => {
  const category = await models.User.create({ name });

  return category;
};

module.exports = {
  createCategory,
  categoryValid,
};