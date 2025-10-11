
const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarios.controller');

router.get('/', comentarioController.findAll);
router.get('/:id', comentarioController.findById);
router.post('/', comentarioController.create);
router.put('/:id', comentarioController.update);
router.delete('/:id', comentarioController.remove);

module.exports = router;