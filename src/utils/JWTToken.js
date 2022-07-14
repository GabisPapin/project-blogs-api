const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secretJWT';
const jwtConfig = {
  algorithm: 'HS256',
};

const generateJWTToken = (payload) => 
  jwt.sign(payload, SECRET, jwtConfig);

module.exports = {
  generateJWTToken,
};