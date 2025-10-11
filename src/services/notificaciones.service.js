const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM notificaciones');
    return rows;
};

exports.findById = async (id_notificacion) => {
    const [rows] = await db.execute('SELECT * FROM notificaciones WHERE id_notificacion = ?', [id_notificacion]);
    return rows[0];
};

exports.create = async (newNotificacion) => {
    const [result] = await db.execute(
        'INSERT INTO notificaciones (id_notificacion, Descripcion, Hora_noti) VALUES (?, ?, ?)',
        [
            newNotificacion.id_notificacion,
            newNotificacion.Descripcion,
            newNotificacion.Hora_noti
        ]
    );
    return { id_notificacion: result.insertId, ...newNotificacion };
};

exports.update = async (id_notificacion, updatedNotificacion) => {
    const [result] = await db.execute(
        'UPDATE notificaciones SET Descripcion = ?, Hora_noti = ? WHERE id_notificacion = ?',
        [
            updatedNotificacion.Descripcion,
            updatedNotificacion.Hora_noti,
            id_notificacion
        ]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_notificacion) => {
    const [result] = await db.execute('DELETE FROM notificaciones WHERE id_notificacion = ?', [id_notificacion]);
    return result.affectedRows > 0;
};