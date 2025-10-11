
const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicaciones.controller');

router.get('/', ubicacionController.findAll);
router.get('/:id', ubicacionController.findById);
router.post('/', ubicacionController.create);
router.put('/:id', ubicacionController.update);
router.delete('/:id', ubicacionController.remove);

module.exports = router;