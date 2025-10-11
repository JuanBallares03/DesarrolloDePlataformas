const ubicacionesService = require('../services/ubicaciones.service');

exports.findAll = async (req, res) => {
    try {
        const ubicaciones = await ubicacionesService.findAll();
        res.status(200).json(ubicaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ubicacion", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const ubicacion = await ubicacionesService.findById(req.params.id);
        if (!ubicacion) {
            return res.status(404).json({ message: "ubicacion no encontrada" });
        }
        res.status(200).json(ubicacion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la ubicacion", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newUbicacion = await ubicacionesService.create(req.body);
        res.status(201).json(newUbicacion);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la ubicacion", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await ubicacionesService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "ubicacion no encontrada" });
        }
        res.status(200).json({ message: "ubicacion actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar ubicacion", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await ubicacionesService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "ubicacion no encontrada" });
        }
        res.status(200).json({ message: "ubicacion eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar ubicacion", error });
    }
};