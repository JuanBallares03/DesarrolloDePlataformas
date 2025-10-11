
const express = require('express');
const router = express.Router();
const tipo_docController = require('../controllers/tipo_documentos.controller');

router.get('/', tipo_docController.findAll);
router.get('/:id', tipo_docController.findById);
router.post('/', tipo_docController.create);
router.put('/:id', tipo_docController.update);
router.delete('/:id', tipo_docController.remove);

module.exports = router;