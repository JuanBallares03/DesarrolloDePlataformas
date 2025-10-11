const gustosService = require('../services/gustos.service');

exports.findAll = async (req, res) => {
    try {
        const gustos = await gustosService.findAll();
        res.status(200).json(gustos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener gustos", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const gusto = await gustosService.findById(req.params.id);
        if (!gusto) {
            return res.status(404).json({ message: "gusto no encontrado" });
        }
        res.status(200).json(gusto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el gusto", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newgusto = await gustosService.create(req.body);
        res.status(201).json(newgusto);
    } catch (error) {
        res.status(500).json({ message: "Error al crear gusto", error });
    }
};

exports.update = async (req, res) => {
    
    try {
        const updated = await gustosService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "gusto no encontrado" });
        }
        res.status(200).json({ message: "gusto actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar gusto", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await gustosService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "gusto no encontrado" });
        }
        res.status(200).json({ message: "gusto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar gusto", error });
    }
};