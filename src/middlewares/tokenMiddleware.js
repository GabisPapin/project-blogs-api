const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secretJWT';
const jwtConfig = {
  algorithm: 'HS256',
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    const verification = jwt.verify(token, SECRET, jwtConfig);
    
    req.user = verification;
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = {
  verifyToken,
};