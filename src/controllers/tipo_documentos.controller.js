const tipo_docServices = require('../services/tipo_documentos.service');

exports.findAll = async (req, res) => {
    try {
        const tipos_doc = await tipo_docServices.findAll();
        res.status(200).json(tipos_doc);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tipo_docs_doc", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const tipo_doc = await tipo_docServices.findById(req.params.id);
        if (!tipo_doc) {
            return res.status(404).json({ message: "tipo_doc no encontrada" });
        }
        res.status(200).json(tipo_doc);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el tipo_doc", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newTipo_doc = await tipo_docServices.create(req.body);
        res.status(201).json(newTipo_doc);
    } catch (error) {
        res.status(500).json({ message: "Error al crear tipo_doc", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await tipo_docServices.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "tipo_doc no encontrado" });
        }
        res.status(200).json({ message: "tipo_doc actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tipo_doc", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await tipo_docServices.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "tipo_doc no encontrada" });
        }
        res.status(200).json({ message: "tipo_doc eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tipo_doc", error });
    }
};