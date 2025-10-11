const viajesService = require('../services/viajes.service');

exports.findAll = async (req, res) => {
    try {
        const viajes = await viajesService.findAll();
        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el viaje", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const viaje = await viajesService.findById(req.params.id);
        if (!viaje) {
            return res.status(404).json({ message: "viaje no encontrado" });
        }
        res.status(200).json(viaje);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el viaje ", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newViaje = await viajesService.create(req.body);
        res.status(201).json(newViaje);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el viaje", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await viajesService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "viaje no encontrado" });
        }
        res.status(200).json({ message: "viaje actualizado exitosamente" });
   } catch (error) {
    console.error(error); // para que se vea en la terminal
    res.status(500).json({
    });
}
};

exports.remove = async (req, res) => {
    try {
        const removed = await viajesService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "viaje no encontrado" });
        }
        res.status(200).json({ message: "viaje eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al elimnar este viaje", error });
    }
};