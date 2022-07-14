const joi = require('joi');
const models = require('../database/models');
const jwtTokenAuth = require('../utils/JWTToken');

const loginAuth = (payload) => {
  const schema = joi.object({
    email: joi.string().email().required,
    password: joi.string().min(6).required,
  });

  // const auth = await schema.validateAsync(payload).catch((err) => {
  //   console.log(err);
  // });

  const auth = schema.validate(payload);

  const { error, value } = auth;

  if (error) {
    return { code: 400, message: { message: 'Some required fields are missing' } };
  }

  return value;
};

const findLogin = async ({
  email,
  password,
}) => {
  const Login = await models.User.findOne({
    attributes: ['email', 'password'],
    where: { email },
  });

  if (!Login || Login.password !== password) {
    return { code: 400, message: { message: 'Invalid fields' } };
  }

  loginAuth(Login);
};

const tokenAuth = async (payload) => {
  const token = await jwtTokenAuth(payload);

  const schema = joi.string().required();

  const authToken = schema.validate(token);

  const { error, value } = authToken;

  if (error) {
    return { code: 401, message: { message: 'Token is required' } };
  }

  return value;
};

module.exports = {
  loginAuth,
  findLogin,
  tokenAuth,
};
