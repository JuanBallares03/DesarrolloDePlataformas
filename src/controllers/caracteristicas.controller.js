const caracteristicasService = require('../services/caracteristicas.service');

exports.findAll = async (req, res) => {
    try {
        const caracteristicas = await caracteristicasService.findAll();
        res.status(200).json(caracteristicas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener características", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const caracteristica = await caracteristicasService.findById(req.params.id);
        if (!caracteristica) {
            return res.status(404).json({ message: "Característica no encontrada" });
        }
        res.status(200).json(caracteristica);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la característica", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newCaracteristica = await caracteristicasService.create(req.body);
        res.status(201).json(newCaracteristica);
    } catch (error) {
        res.status(500).json({ message: "Error al crear característica", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await caracteristicasService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Característica no encontrada" });
        }
        res.status(200).json({ message: "Característica actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar característica", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await caracteristicasService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Característica no encontrada" });
        }
        res.status(200).json({ message: "Característica eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar característica", error });
    }
};