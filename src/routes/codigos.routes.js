
const express = require('express');
const router = express.Router();
const codigoController = require('../controllers/codigos.controller');

router.get('/', codigoController.findAll);
router.get('/:id', codigoController.findById);
router.post('/', codigoController.create);
router.put('/:id', codigoController.update);
router.delete('/:id', codigoController.remove);

module.exports = router;