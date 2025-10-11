const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM tipo_turismo');
    return rows;
};

exports.findById = async (id_tipo_turismo) => {
    const [rows] = await db.execute('SELECT * FROM tipo_turismo WHERE id_tipo_turismo = ?', [id_tipo_turismo]);
    return rows[0];
};

exports.create = async (newTipo_turismo) => {
    const [result] = await db.execute(
        'INSERT INTO tipo_turismo (Tipo_de_turismo,Descripcion) VALUES (?,?)',
        [  
            newTipo_turismo.Tipo_de_turismo,
            newTipo_turismo.Descripcion
        ]   
    );
    return { id_tipo_turismo: result.insertId, ...newTipo_turismo };
};

exports.update = async (id_tipo_turismo, updatedTipo_turismo) => {
    const [result] = await db.execute(
        'UPDATE tipo_turismo SET Tipo_de_turismo = ?, Descripcion = ? WHERE id_tipo_turismo = ?',
        [updatedTipo_turismo.Tipo_de_turismo, updatedTipo_turismo.Descripcion, id_tipo_turismo]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_tipo_turismo) => {
    const [result] = await db.execute('DELETE FROM tipo_turismo WHERE id_tipo_turismo = ?', [id_tipo_turismo]);
    return result.affectedRows > 0;
};