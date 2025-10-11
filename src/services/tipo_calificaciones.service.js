const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM tipo_calificacion');
    return rows;
};

exports.findById = async (id_tipo_calificacion) => {
    const [rows] = await db.execute('SELECT * FROM tipo_calificacion WHERE id_tipo_calificacion = ?', [id_tipo_calificacion]);
    return rows[0];
};

exports.create = async (newTipo_calificacion) => {
    const [result] = await db.execute(
        'INSERT INTO tipo_calificacion (Tipo_cal) VALUES (?)',
        [   
            newTipo_calificacion.Tipo_cal
        ]   
    );
    return { id_tipo_calificacion: result.insertId, ...newTipo_calificacion };
};

exports.update = async (id_tipo_calificacion, updatedTipo_cali) => {
    const [result] = await db.execute(
        'UPDATE tipo_calificacion SET Tipo_cal = ? WHERE id_tipo_calificacion = ?',
        [updatedTipo_cali.Tipo_cal, id_tipo_calificacion]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_tipo_calificacion) => {
    const [result] = await db.execute('DELETE FROM tipo_calificacion WHERE id_tipo_calificacion = ?', [id_tipo_calificacion]);
    return result.affectedRows > 0;
};