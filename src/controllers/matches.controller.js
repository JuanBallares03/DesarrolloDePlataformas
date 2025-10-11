const matchService = require('../services/matches.service');

exports.findAll = async (req, res) => {
    try {
        const match = await matchService.findAll();
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los matches", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const matches = await matchService.findById(req.params.id);
        if (!matches) {
            return res.status(404).json({ message: "match no encontrado" });
        }
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el match", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newmatches = await matchService.create(req.body);
        res.status(201).json(newmatches);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el match", error });
    }
};

exports.update = async (req, res) => {
    
    try {
        const updated = await matchService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "match no encontrado" });
        }
        res.status(200).json({ message: "match actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el match", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await matchService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "match no encontradas" });
        }
        res.status(200).json({ message: "match eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el match", error });
    }
};