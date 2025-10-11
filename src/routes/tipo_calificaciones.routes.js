
const express = require('express');
const router = express.Router();
const tipo_calController = require('../controllers/tipo_calificaciones.controller');

router.get('/', tipo_calController.findAll);
router.get('/:id', tipo_calController.findById);
router.post('/', tipo_calController.create);
router.put('/:id', tipo_calController.update);
router.delete('/:id', tipo_calController.remove);

module.exports = router;