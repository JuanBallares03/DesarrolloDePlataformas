const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM codigos');
    return rows;
};

exports.findById = async (id_codigo) => {
    const [rows] = await db.execute('SELECT * FROM codigos WHERE id = ?', [id_codigo]);
    return rows[0];
};

exports.create = async (newCodigo) => {
    const [result] = await db.execute(
        'INSERT INTO codigos (Nombre, Valor) VALUES (?, ?)',
        [
            newCodigo.Nombre,
            newCodigo.Valor
        ]
    );
    return { id_codigo: result.insertId, ...newCodigo};
};

exports.update = async (id_codigo, updatedCodigo) => {
    const [result] = await db.execute(
        'UPDATE codigos SET Nombre = ?, Valor = ? WHERE id = ?',
        [updatedCodigo.Nombre,updatedCodigo.Valor, id_codigo]);
    return result.affectedRows > 0;
};
//Ctrl + Shift + L Para seleccionar una palabra repetida
exports.remove = async (id_codigo) => {
    const [result] = await db.execute('DELETE FROM codigos WHERE id = ?', [id_codigo]);
    return result.affectedRows > 0;
};