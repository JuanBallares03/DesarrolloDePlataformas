const metodoService = require('../services/metodos.service');

exports.findAll = async (req, res) => {
    try {
        const metodos = await metodoService.findAll();
        res.status(200).json(metodos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los métodos", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const metodo = await metodoService.findById(req.params.id);
        if (!metodo) {
            return res.status(404).json({ message: "Método no encontrado" });
        }
        res.status(200).json(metodo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el método", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newMetodo = await metodoService.create(req.body);
        res.status(201).json(newMetodo);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el método", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await metodoService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Método no encontrado" });
        }
        res.status(200).json({ message: "Método actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el método", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await metodoService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Método no encontrado" });
        }
        res.status(200).json({ message: "Método eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el método", error });
    }
};