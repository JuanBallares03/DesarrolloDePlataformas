
const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajes.controller');

router.get('/', viajeController.findAll);
router.get('/:id', viajeController.findById);
router.post('/', viajeController.create);
router.put('/:id', viajeController.update);
router.delete('/:id', viajeController.remove);

module.exports = router;