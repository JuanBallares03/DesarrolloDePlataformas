const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM `match`');
    return rows;
};

exports.findById = async (id_match) => {
    const [rows] = await db.execute('SELECT * FROM `match` WHERE id_match = ?', [id_match]);
    return rows[0];
};

exports.create = async (newmatch) => {
    const [result] = await db.execute(
        'INSERT INTO `match` (Fecha) VALUES (?)',
        [
            newmatch.Fecha
        ]
    );
    return { id_match: result.insertId, ...newmatch};
};

exports.update = async (id_match, updatedmatch) => {
    const [result] = await db.execute(
        'UPDATE `match` SET Fecha = ? WHERE id = ?',
        [updatedmatch.Fecha, id_match]);
    return result.affectedRows > 0;
};
exports.remove = async (id_match) => {
    const [result] = await db.execute('DELETE FROM `match` WHERE id_match = ?', [id_match]);
    return result.affectedRows > 0;
};