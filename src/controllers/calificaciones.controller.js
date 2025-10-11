const calificacionService = require('../services/calificaciones.service');

exports.findAll = async (req, res) => {
    try {
        const users = await calificacionService.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error a la reseña del usuario", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const user = await calificacionService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Reseña no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error la reseña del usuario", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newUser = await calificacionService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear una reseña", error });
    }
};

exports.update = async (req, res) => {
    
    try {
        const updated = await calificacionService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Reseña no encontrado" });
        }
        res.status(200).json({ message: "Reseña actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reseña", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await calificacionService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Reseña no encontrada" });
        }
        res.status(200).json({ message: "Reseña eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar reseña", error });
    }
};