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

const getAll = async (_req, res) => {
  const user = await userService.getAll();
  return res.status(200).json(user);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (user.code) return res.status(user.code).json(user.message);

  return res.status(200).json(user);
};

const removeUser = async (req, res) => {
  const me = req.params.id;

  await userService.removeUser(me);

  return res.status(204).end();
};

module.exports = {
  createUser,
  getAll,
  getById,
  removeUser,
};