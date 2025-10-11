const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM gustos');
    return rows;
};

exports.findById = async (id_gustos) => {
    const [rows] = await db.execute('SELECT * FROM gustos WHERE id_gustos = ?', [id_gustos]);
    return rows[0];
};

exports.create = async (newgustos) => {
    const [result] = await db.execute(
        'INSERT INTO gustos (Nombre, Descripcion, Estado) VALUES (?,?,?)',
        [
            newgustos.Nombre,
            newgustos.Descripcion,
            newgustos.Estado
        ]
    );
    return { id_gustos: result.insertId, ...newgustos};
};

exports.update = async (id_gustos, updatedgustos) => {
    const [result] = await db.execute(
        'UPDATE gustos SET Nombre = ? , Descripcion = ? , Estado = ? WHERE id = ?',
        [updatedgustos.Nombre,updatedgustos.Descripcion,updatedgustos.Estado, id_gustos]);
    return result.affectedRows > 0;
};
exports.remove = async (id_gustos) => {
    const [result] = await db.execute('DELETE FROM gustos WHERE id_gustos = ?', [id_gustos]);
    return result.affectedRows > 0;
};