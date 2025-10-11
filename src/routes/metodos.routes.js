
const express = require('express');
const router = express.Router();
const metodoController = require('../controllers/metodos.controller');

router.get('/', metodoController.findAll);
router.get('/:id', metodoController.findById);
router.post('/', metodoController.create);
router.put('/:id', metodoController.update);
router.delete('/:id', metodoController.remove);

module.exports = router;