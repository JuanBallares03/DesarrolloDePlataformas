const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM invitaciones');
    return rows;
};

exports.findById = async (id_invitacion) => {
    const [rows] = await db.execute('SELECT * FROM invitaciones WHERE id_invitacion = ?', [id_invitacion]);
    return rows[0];
};

exports.create = async (newinvitaciones) => {
    const [result] = await db.execute(
        'INSERT INTO invitaciones (Estado, Rol) VALUES (?,?)',
        [
            newinvitaciones.Estado,
            newinvitaciones.Rol
        ]
    );
    return { id_invitacion: result.insertId, ...newinvitaciones};
};

exports.update = async (id_invitacion, updatedinvitaciones) => {
    const [result] = await db.execute(
        'UPDATE invitaciones SET Descripcion = ? , Likes = ? , Fecha_publi = ? WHERE id = ?',
        [updatedinvitaciones.Estado,updatedinvitaciones.Rol,id_invitacion]);
    return result.affectedRows > 0;
};
exports.remove = async (id_invitacion) => {
    const [result] = await db.execute('DELETE FROM invitaciones WHERE id_invitacion = ?', [id_invitacion]);
    return result.affectedRows > 0;
};