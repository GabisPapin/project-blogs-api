const userService = require('../services/userService');

const createUser = async (req, res) => {
  const userAuth = await userService.userAuth(req.body);

  if (userAuth.code) {
    return res.status(userAuth.code).json(userAuth.message);
  }

  const findUser = await userService.findUser(req.body);

  if (findUser) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const newUser = await userService.createUser(userAuth);

  const token = userService.tokenAuth(newUser);

  return res.status(201).json({ token });
};

module.exports = {
  createUser,
};