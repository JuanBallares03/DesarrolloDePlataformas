const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios.controller');
const verificarToken = require('../middleware/auth.middleware'); 

router.get('/', verificarToken, usuarioController.findAll);
router.get('/:id', verificarToken, usuarioController.findById);
router.post('/', verificarToken, usuarioController.create);
router.put('/:id', verificarToken, usuarioController.update);
router.delete('/:id', verificarToken, usuarioController.remove);

module.exports = router;