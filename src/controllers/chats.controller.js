const chatsService = require('../services/chats.service');

exports.findAll = async (req, res) => {
    try {
        const chats = await chatsService.findAll();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener chats", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const chat = await chatsService.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: "Chat no encontrado" });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el chat", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newChat = await chatsService.create(req.body);
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ message: "Error al crear chat", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await chatsService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Chat no encontrado" });
        }
        res.status(200).json({ message: "Chat actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar chat", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await chatsService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Chat no encontrado" });
        }
        res.status(200).json({ message: "Chat eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar chat", error });
    }
};