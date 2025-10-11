const tipo_calServices = require('../services/tipo_calificaciones.service');

exports.findAll = async (req, res) => {
    try {
        const tipos = await tipo_calServices.findAll();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tipos", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const tipo = await tipo_calServices.findById(req.params.id);
        if (!tipo) {
            return res.status(404).json({ message: "tipo no encontrada" });
        }
        res.status(200).json(tipo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el tipo", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newTipo = await tipo_calServices.create(req.body);
        res.status(201).json(newTipo);
    } catch (error) {
        res.status(500).json({ message: "Error al crear tipo", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await tipo_calServices.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "tipo no encontrado" });
        }
        res.status(200).json({ message: "tipo actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tipo", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await tipo_calServices.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "tipo no encontrada" });
        }
        res.status(200).json({ message: "tipo eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tipo", error });
    }
};