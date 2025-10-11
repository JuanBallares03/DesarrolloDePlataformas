
const express = require('express');
const router = express.Router();
const caracteristicaController = require('../controllers/caracteristicas.controller');

router.get('/', caracteristicaController.findAll);
router.get('/:id', caracteristicaController.findById);
router.post('/', caracteristicaController.create);
router.put('/:id', caracteristicaController.update);
router.delete('/:id', caracteristicaController.remove);

module.exports = router;