const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM destinos');
    return rows;
};

exports.findById = async (id_destinos) => {
    const [rows] = await db.execute('SELECT * FROM destinos WHERE id_destinos = ?', [id_destinos]);
    return rows[0];
};

exports.create = async (newDestino) => {
    const [result] = await db.execute(
        'INSERT INTO destinos (Nombre_destino) VALUES (?)',
        [
            newDestino.Nombre_destino
        ]
    );
    return { id_destinos: result.insertId, ...newDestino};
};

exports.update = async (id_destinos, updatedDestino) => {
    const [result] = await db.execute(
        'UPDATE destinos SET Nombre_destino = ? WHERE id = ?',
        [updatedDestino.Nombre_destino, id_destinos]);
    return result.affectedRows > 0;
};
exports.remove = async (id_destinos) => {
    const [result] = await db.execute('DELETE FROM destinos WHERE id_destinos = ?', [id_destinos]);
    return result.affectedRows > 0;
};