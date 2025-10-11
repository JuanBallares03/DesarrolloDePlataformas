
const express = require('express');
const router = express.Router();
const gustoController = require('../controllers/gustos.controller');

router.get('/', gustoController.findAll);
router.get('/:id', gustoController.findById);
router.post('/', gustoController.create);
router.put('/:id', gustoController.update);
router.delete('/:id', gustoController.remove);

module.exports = router;