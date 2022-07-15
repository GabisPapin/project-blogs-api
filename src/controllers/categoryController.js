const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const categoryValid = await categoryService.categoryValid(req.body);

  if (categoryValid.code) {
    return res.status(categoryValid.code).json(categoryValid.message);
  }

  const newCategory = await categoryService.createCategory(categoryValid);

  return res.status(201).json(newCategory);
};

module.exports = {
  createCategory,
};