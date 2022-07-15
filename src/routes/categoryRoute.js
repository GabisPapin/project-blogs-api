const express = require('express');
const categoryController = require('../controllers/categoryController');
const { verifyToken } = require('../middlewares/tokenMiddleware');

const categoryRouter = express.Router();

categoryRouter.post('/', verifyToken, categoryController.createCategory);

module.exports = categoryRouter;