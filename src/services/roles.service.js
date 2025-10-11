const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM roles');
    return rows;
};

exports.findById = async (id_roles) => {
    const [rows] = await db.execute('SELECT * FROM roles WHERE id_roles = ?', [id_roles]);
    return rows[0];
};

exports.create = async (newRol) => {
    const [result] = await db.execute(
        'INSERT INTO roles (Nombre) VALUES (?)',
        [
            newRol.Nombre
        ]
    );
    return { id_roles: result.insertId, ...newRol };
};

exports.update = async (id_roles, updatedRol) => {
    const [result] = await db.execute(
        'UPDATE roles SET Nombre = ? WHERE id_roles = ?',
        [
            updatedRol.Nombre,
            id_roles
        ]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_roles) => {
    const [result] = await db.execute('DELETE FROM roles WHERE id_roles = ?', [id_roles]);
    return result.affectedRows > 0;
};