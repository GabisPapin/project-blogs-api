const joi = require('joi');
const models = require('../database/models');
const jwtTokenAuth = require('../utils/JWTToken');

const userAuth = (payload) => {
  const schema = joi.object({
    displayName: joi.string().min(8).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    image: joi.string().required(),
  });

  const auth = schema.validate(payload);

  const { error, value } = auth;

  if (error) return { code: 400, message: { message: error.message } };

  return value;
};

const createUser = async ({
  displayName,
  email,
  password,
  image,
}) => {
  const newUser = await models.User.create({
    displayName,
    email,
    password,
    image,
  });

  const { password: any, ...data } = newUser;

  return data;
};

const findUser = async ({ email }) => {
  const findEmail = await models.User.findOne({ where: { email },
   raw: true });

  if (!findEmail) return false;

  return true;
};

const tokenAuth = (payload) => {
  const token = jwtTokenAuth.generateJWTToken(payload);

  const schema = joi.string().required();

  const authToken = schema.validate(token);

  const { error, value } = authToken;

  if (error) {
    return { code: 401, message: 'Token is required' };
  }

  return value;
};

const getAll = () => {
  const user = models.User.findAll({ attributes: { exclude: ['password'] } });
  return user;
};

const getById = async (id) => {
  const user = await models.User.findByPk(id, { raw: true, attributes: { exclude: ['password'] } });

  if (!user) return { code: 404, message: { message: 'User does not exist' } };

  return user;
};

const removeUser = async (id) => {
  const removed = await models.User.findByPk(id, 
    { raw: true, attributes: { exclude: ['password'] },
  });
  return removed;
};

module.exports = {
  userAuth,
  createUser,
  findUser,
  tokenAuth,
  getAll,
  getById,
  removeUser,
};