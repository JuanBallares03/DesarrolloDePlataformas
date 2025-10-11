
const express = require('express');
const router = express.Router();
const tipo_turismoController = require('../controllers/tipo_turismos.controller');

router.get('/', tipo_turismoController.findAll);
router.get('/:id', tipo_turismoController.findById);
router.post('/', tipo_turismoController.create);
router.put('/:id', tipo_turismoController.update);
router.delete('/:id', tipo_turismoController.remove);

module.exports = router;