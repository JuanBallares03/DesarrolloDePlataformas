const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM metodos');
    return rows;
};

exports.findById = async (id_metodo) => {
    const [rows] = await db.execute(
        'SELECT * FROM metodos WHERE id_metodo = ?',
        [id_metodo]
    );
    return rows[0];
};

exports.create = async (newMetodo) => {
    const [result] = await db.execute(
        'INSERT INTO metodos  Tipo_pago) VALUES (?)',
        [
            newMetodo.Tipo_pago
        ]
    );
    return { id_metodo: result.insertId, ...newMetodo };
};

exports.update = async (id_metodo, updatedMetodo) => {
    const [result] = await db.execute(
        'UPDATE metodos SET Tipo_pago = ? WHERE id_metodo = ?',
        [updatedMetodo.Tipo_pago,id_metodo]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_metodo) => {
    const [result] = await db.execute(
        'DELETE FROM metodos WHERE id_metodo = ?',
        [id_metodo]
    );
    return result.affectedRows > 0;
};