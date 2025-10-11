const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM ubicacion');
    return rows;
};

exports.findById = async (id_ubicacion) => {
    const [rows] = await db.execute('SELECT * FROM ubicacion WHERE id_ubicacion = ?', [id_ubicacion]);
    return rows[0];
};

exports.create = async (newUbicacion) => {
    const [result] = await db.execute(
        'INSERT INTO ubicacion ( Pais, Departamento, Ciudad, Direccion) VALUES (?,?,?,?)',
        [
            newUbicacion.Pais,
            newUbicacion.Departamento,
            newUbicacion.Ciudad,
            newUbicacion.Direccion
        ]
    );
    return { id_ubicacion: result.insertId, ...newUbicacion };
};

exports.update = async (id_ubicacion, updatedUbi) => {
    const [result] = await db.execute(
        'UPDATE ubicacion SET Pais = ?, Departamento = ?, Ciudad = ?, Direccion = ? WHERE id_ubicacion = ?',
        [updatedUbi.Pais,updatedUbi.Departamento,updatedUbi.Ciudad, updatedUbi.Direccion,id_ubicacion]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_ubicacion) => {
    const [result] = await db.execute('DELETE FROM ubicacion WHERE id_ubicacion = ?', [id_ubicacion]);
    return result.affectedRows > 0;
};