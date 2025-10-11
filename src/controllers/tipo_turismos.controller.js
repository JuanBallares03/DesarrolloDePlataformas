const tipo_turismoServices = require('../services/tipo_turismos.service');

exports.findAll = async (req, res) => {
    try {
        const tipos_turismo = await tipo_turismoServices.findAll();
        res.status(200).json(tipos_turismo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tipo_turismo", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const tipo_turismo = await tipo_turismoServices.findById(req.params.id);
        if (!tipo_turismo) {
            return res.status(404).json({ message: "turismo no encontrada" });
        }
        res.status(200).json(tipo_turismo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el tipo_turismo", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newTipo_turismo = await tipo_turismoServices.create(req.body);
        res.status(201).json(newTipo_turismo);
    } catch (error) {
        res.status(500).json({ message: "Error al crear tipo_turismo", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await tipo_turismoServices.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "tipo_turismo no encontrado" });
        }
        res.status(200).json({ message: "tipo_turismo actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tipo_turismo", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await tipo_turismoServices.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "tipo_turismo no encontrada" });
        }
        res.status(200).json({ message: "tipo_turismo eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tipo_turismo", error });
    }
};