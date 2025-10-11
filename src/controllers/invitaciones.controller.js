const invitacionService = require('../services/invitaciones.service');

exports.findAll = async (req, res) => {
    try {
        const invitacion = await invitacionService.findAll();
        res.status(200).json(invitacion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener invitacion", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const invitaciones = await invitacionService.findById(req.params.id);
        if (!invitaciones) {
            return res.status(404).json({ message: "invitacion no encontrado" });
        }
        res.status(200).json(invitaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la invitacion", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newinvitaciones = await invitacionService.create(req.body);
        res.status(201).json(newinvitaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la invitacion", error });
    }
};

exports.update = async (req, res) => {
    
    try {
        const updated = await invitacionService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "invitaciones no encontrado" });
        }
        res.status(200).json({ message: "invitaciones actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar invitaciones", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await invitacionService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "invitaciones no encontradas" });
        }
        res.status(200).json({ message: "invitaciones eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar invitaciones", error });
    }
};