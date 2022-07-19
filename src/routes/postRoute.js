const express = require('express');
const postController = require('../controllers/postController');
const { verifyToken } = require('../middlewares/tokenMiddleware');

const postRouter = express.Router();

postRouter.post('/', verifyToken, postController.createPost);

postRouter.put('/:id', verifyToken, postController.updatePost);

postRouter.get('/:id', verifyToken, postController.getById);

postRouter.delete('/:id', verifyToken, postController.removePost);

postRouter.get('/', verifyToken, postController.getAll);

module.exports = postRouter;