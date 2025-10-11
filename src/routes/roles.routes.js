
const express = require('express');
const router = express.Router();
const rolController = require('../controllers/roles.controller');

router.get('/', rolController.findAll);
router.get('/:id', rolController.findById);
router.post('/', rolController.create);
router.put('/:id', rolController.update);
router.delete('/:id', rolController.remove);

module.exports = router;