
const express = require('express');
const router = express.Router();
const lugarController = require('../controllers/lugares.controller');

router.get('/', lugarController.findAll);
router.get('/:id', lugarController.findById);
router.post('/', lugarController.create);
router.put('/:id', lugarController.update);
router.delete('/:id', lugarController.remove);

module.exports = router;