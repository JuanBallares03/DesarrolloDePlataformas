
const express = require('express');
const router = express.Router();
const membresiaController = require('../controllers/membresias.controller');

router.get('/', membresiaController.findAll);
router.get('/:id', membresiaController.findById);
router.post('/', membresiaController.create);
router.put('/:id', membresiaController.update);
router.delete('/:id', membresiaController.remove);

module.exports = router;