const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';
// const jwtConfig = {
//   algorithm: 'HS256',
// };

const generateJWTToken = (payload) => 
  jwt.sign(payload, SECRET);

// console.log(generateJWTToken({ email: 'gabis@gmail.com', senha: '123456' }));

module.exports = {
  generateJWTToken,
};