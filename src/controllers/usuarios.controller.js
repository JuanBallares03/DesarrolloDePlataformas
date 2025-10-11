const UsuariosService = require('../services/usuarios.service');
const usuariosService = new UsuariosService();

class UsuariosController {
  async findAll(req, res) {
    try {
      const users = await usuariosService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const user = await usuariosService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newUser = await usuariosService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await usuariosService.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async remove(req, res) {
    try {
      const removed = await usuariosService.remove(req.params.id);
      if (!removed) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UsuariosController();
