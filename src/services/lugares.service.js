const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM lugares');
    return rows;
};

exports.findById = async (id_lugares) => {
    const [rows] = await db.execute('SELECT * FROM lugares WHERE id_lugares = ?', [id_lugares]);
    return rows[0];
};

exports.create = async (newlugares) => {
    const [result] = await db.execute(
        'INSERT INTO lugares (Nombre, Lat, Longitud, Precio) VALUES (?,?,?,?)',
        [
            newlugares.Nombre,
            newlugares.Lat,
            newlugares.Longitud,
            newlugares.Precio
        ]
    );
    return { id_lugares: result.insertId, ...newlugares};
};

exports.update = async (id_lugares, updatedlugares) => {
    const [result] = await db.execute(
        'UPDATE lugares SET Descripcion = ? , Likes = ? , Fecha_publi = ? WHERE id = ?',
        [updatedlugares.Nombre,updatedlugares.Lat,updatedlugares.Longitud,updatedlugares.Precio,id_lugares]);
    return result.affectedRows > 0;
};
exports.remove = async (id_lugares) => {
    const [result] = await db.execute('DELETE FROM lugares WHERE id_lugares = ?', [id_lugares]);
    return result.affectedRows > 0;
};