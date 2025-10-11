const rolesService = require('../services/roles.service');

exports.findAll = async (req, res) => {
    try {
        const roles = await rolesService.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el rol", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const rol = await rolesService.findById(req.params.id);
        if (!rol) {
            return res.status(404).json({ message: "Rol no encontrada" });
        }
        res.status(200).json(rol);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el rol ", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newRol = await rolesService.create(req.body);
        res.status(201).json(newRol);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await rolesService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "rol no encontrada" });
        }característica
        res.status(200).json({ message: "rol actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar este rol", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await rolesService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "rol no encontrado" });
        }
        res.status(200).json({ message: "rol eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al elimnar este rol", error });
    }
};