const notificacionService = require('../services/notificaciones.service');

exports.findAll = async (req, res) => {
    try {
        const notificaciones = await notificacionService.findAll();
        res.status(200).json(notificaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las notificaciones", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const notificacion = await notificacionService.findById(req.params.id);
        if (!notificacion) {
            return res.status(404).json({ message: "Notificación no encontrada" });
        }
        res.status(200).json(notificacion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la notificación", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newNotificacion = await notificacionService.create(req.body);
        res.status(201).json(newNotificacion);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la notificación", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await notificacionService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Notificación no encontrada" });
        }
        res.status(200).json({ message: "Notificación actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la notificación", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await notificacionService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Notificación no encontrada" });
        }
        res.status(200).json({ message: "Notificación eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la notificación", error });
    }
};