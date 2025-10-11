
const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matches.controller');

router.get('/', matchController.findAll);
router.get('/:id', matchController.findById);
router.post('/', matchController.create);
router.put('/:id', matchController.update);
router.delete('/:id', matchController.remove);

module.exports = router;