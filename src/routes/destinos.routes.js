
const express = require('express');
const router = express.Router();
const destinoController = require('../controllers/destinos.controller');

router.get('/', destinoController.findAll);
router.get('/:id', destinoController.findById);
router.post('/', destinoController.create);
router.put('/:id', destinoController.update);
router.delete('/:id', destinoController.remove);

module.exports = router;