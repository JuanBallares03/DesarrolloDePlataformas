
const express = require('express');
const router = express.Router();
const invitacionController = require('../controllers/invitaciones.controller');

router.get('/', invitacionController.findAll);
router.get('/:id', invitacionController.findById);
router.post('/', invitacionController.create);
router.put('/:id', invitacionController.update);
router.delete('/:id', invitacionController.remove);

module.exports = router;