const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM membresias');
    return rows;
};

exports.findById = async (id_membresia) => {
    const [rows] = await db.execute(
        'SELECT * FROM membresias WHERE id_membresia = ?',
        [id_membresia]
    );
    return rows[0];
};

exports.create = async (newMembresia) => {
    const [result] = await db.execute(
        'INSERT INTO membresias (id_membresia, Tipo, Fecha_inicio, Fecha_fin, Estado) VALUES (?, ?, ?, ?, ?)',
        [
            newMembresia.id_membresia,
            newMembresia.Tipo,
            newMembresia.Fecha_inicio,
            newMembresia.Fecha_fin,
            newMembresia.Estado
        ]
    );
    return { id_membresia: result.insertId, ...newMembresia };
};

exports.update = async (id_membresia, updatedMembresia) => {
    const [result] = await db.execute(
        'UPDATE membresias SET Tipo = ?, Fecha_inicio = ?, Fecha_fin = ?, Estado = ? WHERE id_membresia = ?',
        [
            updatedMembresia.Tipo,
            updatedMembresia.Fecha_inicio,
            updatedMembresia.Fecha_fin,
            updatedMembresia.Estado,
            id_membresia
        ]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_membresia) => {
    const [result] = await db.execute(
        'DELETE FROM membresias WHERE id_membresia = ?',
        [id_membresia]
    );
    return result.affectedRows > 0;
};