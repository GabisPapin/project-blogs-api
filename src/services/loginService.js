const joi = require('joi');
const models = require('../database/models');
const jwtTokenAuth = require('../utils/JWTToken');

const loginAuth = (payload) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const auth = schema.validate(payload);

  const { error, value } = auth;

  // try {
  //   const value = await schema.validateAsync(payload);
  //   return value;
  // } catch (error) {
  //   console.log(error);
  //   return { code: 400, message: { message: 'Some required fields are missing' } };
  // }

  if (error) {
    return { code: 400, message: { message: 'Some required fields are missing' } };
  }

  return value;
};

// console.log(loginAuth({ email: 'gabis@gmail.com', password: '123456' }));

const findLogin = async ({
  email,
  password,
}) => {
  const Login = await models.User.findOne({
    where: { email },
    raw: true,
  });

  if (!Login || Login.password !== password) {
    return { code: 400, message: { message: 'Invalid fields' } };
  }
  
  const { password: any, ...data } = Login;

  return data;
};

const tokenAuth = (payload) => {
  const token = jwtTokenAuth.generateJWTToken(payload);

  const schema = joi.string().required();

  const authToken = schema.validate(token);

  const { error } = authToken;

  if (error) {
    return { code: 401, message: 'Token is required' };
  }

  return token;
};

module.exports = {
  loginAuth,
  findLogin,
  tokenAuth,
};
