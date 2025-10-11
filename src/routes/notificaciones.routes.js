
const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificaciones.controller');

router.get('/', notificacionController.findAll);
router.get('/:id', notificacionController.findById);
router.post('/', notificacionController.create);
router.put('/:id', notificacionController.update);
router.delete('/:id', notificacionController.remove);

module.exports = router;