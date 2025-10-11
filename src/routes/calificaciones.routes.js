
const express = require('express');
const router = express.Router();
const calificacionController = require('../controllers/calificaciones.controller');

router.get('/', calificacionController.findAll);
router.get('/:id', calificacionController.findById);
router.post('/', calificacionController.create);
router.put('/:id', calificacionController.update);
router.delete('/:id', calificacionController.remove);

module.exports = router;