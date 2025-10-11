const destinosService = require('../services/destinos.service');

exports.findAll = async (req, res) => {
    try {
        const destinos = await destinosService.findAll();
        res.status(200).json(destinos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener destinos", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const destino = await destinosService.findById(req.params.id);
        if (!destino) {
            return res.status(404).json({ message: "destino no encontrado" });
        }
        res.status(200).json(destino);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el destino", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newdestino = await destinosService.create(req.body);
        res.status(201).json(newdestino);
    } catch (error) {
        res.status(500).json({ message: "Error al crear destino", error });
    }
};

exports.update = async (req, res) => {
    
    try {
        const updated = await destinosService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "destino no encontrado" });
        }
        res.status(200).json({ message: "destino actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar destino", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await destinosService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "destino no encontrado" });
        }
        res.status(200).json({ message: "destino eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar destino", error });
    }
};