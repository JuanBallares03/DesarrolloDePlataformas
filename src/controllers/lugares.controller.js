const lugarService = require('../services/lugares.service');

exports.findAll = async (req, res) => {
    try {
        const lugar = await lugarService.findAll();
        res.status(200).json(lugar);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los lugares", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const lugares = await lugarService.findById(req.params.id);
        if (!lugares) {
            return res.status(404).json({ message: "lugar no encontrado" });
        }
        res.status(200).json(lugares);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el lugares", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newlugares = await lugarService.create(req.body);
        res.status(201).json(newlugares);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el lugar", error });
    }
};

exports.update = async (req, res) => {
    
    try {
        const updated = await lugarService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "lugares no encontrados" });
        }
        res.status(200).json({ message: "lugares actualizados exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el lugar", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await lugarService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "lugares no encontradas" });
        }
        res.status(200).json({ message: "lugar eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el lugar", error });
    }
};