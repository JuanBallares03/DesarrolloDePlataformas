const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM calificacion');
    return rows;
};

exports.findById = async (id_calificacion) => {
    const [rows] = await db.execute('SELECT * FROM calificacion WHERE id_calificacion = ?', [id_calificacion]);
    return rows[0];
};

exports.create = async (newCalificacion) => {
    const [result] = await db.execute(
        'INSERT INTO calificacion (Puntuacion, Reseña) VALUES (?, ?)',
        [   
            newCalificacion.Puntuacion, 
            newCalificacion.Reseña
        ]
    );
    return { id_calificacion: result.insertId, ...newCalificacion};
};

exports.update = async (id_calificacion, updatedCalifiacion) => {
    const [result] = await db.execute(
        'UPDATE calificacion SET Puntuacion = ?, Reseña = ? WHERE id_calificacion = ?',
        [updatedCalifiacion.Puntuacion, updatedCalifiacion.Reseña, id_calificacion]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_calificacion) => {
    const [result] = await db.execute('DELETE FROM calificacion WHERE id_calificacion = ?', [id_calificacion]);
    return result.affectedRows > 0;
};