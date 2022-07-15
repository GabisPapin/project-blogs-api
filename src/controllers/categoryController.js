const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const categoryValid = await categoryService.categoryValid(req.body);

  if (categoryValid.code) {
    return res.status(categoryValid.code).json(categoryValid.message);
  }

  const newCategory = await categoryService.createCategory(categoryValid);

  return res.status(201).json(newCategory);
};

const getAll = async (_req, res) => {
  const category = await categoryService.getAll();
  return res.status(200).json(category);
};

module.exports = {
  createCategory,
  getAll,
};