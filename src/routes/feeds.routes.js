
const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feeds.controller');

router.get('/', feedController.findAll);
router.get('/:id', feedController.findById);
router.post('/', feedController.create);
router.put('/:id', feedController.update);
router.delete('/:id', feedController.remove);

module.exports = router;