const membresiaService = require('../services/membresias.service');

exports.findAll = async (req, res) => {
    try {
        const membresias = await membresiaService.findAll();
        res.status(200).json(membresias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las membresias", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const membresia = await membresiaService.findById(req.params.id);
        if (!membresia) {
            return res.status(404).json({ message: "membresia no encontrada" });
        }
        res.status(200).json(membresia);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el membresia", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newMembresia= await membresiaService.create(req.body);
        res.status(201).json(newMembresia);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el membresia", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await membresiaService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "membresia no encontrada" });
        }
        res.status(200).json({ message: "membresia actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la membresia", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await membresiaService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "membresia no encontrada" });
        }
        res.status(200).json({ message: "membresia eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la membresia", error });
    }
};