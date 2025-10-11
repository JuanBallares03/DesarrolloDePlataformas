const feedsService = require('../services/feeds.service');

exports.findAll = async (req, res) => {
    try {
        const feeds = await feedsService.findAll();
        res.status(200).json(feeds);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener feeds", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const feed = await feedsService.findById(req.params.id);
        if (!feed) {
            return res.status(404).json({ message: "feed no encontrado" });
        }
        res.status(200).json(feed);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el feed", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newfeed = await feedsService.create(req.body);
        res.status(201).json(newfeed);
    } catch (error) {
        res.status(500).json({ message: "Error al crear feed", error });
    }
};

exports.update = async (req, res) => {
    
    try {
        const updated = await feedsService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "feed no encontrado" });
        }
        res.status(200).json({ message: "feed actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar feed", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await feedsService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "feed no encontrado" });
        }
        res.status(200).json({ message: "feed eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar feed", error });
    }
};