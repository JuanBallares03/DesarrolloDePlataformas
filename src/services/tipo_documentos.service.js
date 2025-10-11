const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM tipo_documento');
    return rows;
};

exports.findById = async (id_tipo_id) => {
    const [rows] = await db.execute('SELECT * FROM tipo_documento WHERE id_tipo_id = ?', [id_tipo_id]);
    return rows[0];
};

exports.create = async (newTipo_documento) => {
    const [result] = await db.execute(
        'INSERT INTO tipo_documento (Nombre,Numero_doc) VALUES (?,?,?)',
        [   
            newTipo_documento.Nombre,
            newTipo_documento.Numero_doc
        ]   
    );
    return { id_tipo_id: result.insertId, ...newTipo_documento };
};

exports.update = async (id_tipo_id, updatedTipo_doc) => {
    const [result] = await db.execute(
        'UPDATE tipo_documento SET Nombre = ?, Numero_doc = ? WHERE id_tipo_id = ?',
        [updatedTipo_doc.Nombre, updatedTipo_doc.Numero_doc, id_tipo_id]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_tipo_id) => {
    const [result] = await db.execute('DELETE FROM tipo_documento WHERE id_tipo_id = ?', [id_tipo_id]);
    return result.affectedRows > 0;
};