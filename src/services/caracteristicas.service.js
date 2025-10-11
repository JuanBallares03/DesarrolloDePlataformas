const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM caracteristicas');
    return rows;
};

exports.findById = async (id_caracteristica) => {
    const [rows] = await db.execute('SELECT * FROM caracteristicas WHERE id_caracteristica = ?', [id_caracteristica]);
    return rows[0];
};

exports.create = async (newCaracteristica) => {
    const [result] = await db.execute(
        'INSERT INTO caracteristicas (Nombre, Descripcion) VALUES (?, ?)',
        [ 
            newCaracteristica.Nombre, 
            newCaracteristica.Descripcion
        ]
    );
    return { id_caracteristica: result.insertId, ...newCaracteristica };
};

exports.update = async (id_caracteristica, updatedCaracteristica) => {
    const [result] = await db.execute(
        'UPDATE caracteristicas SET Nombre = ?, Descripcion = ? WHERE id_caracteristica = ?',
        [updatedCaracteristica.Nombre, updatedCaracteristica.Descripcion, id_caracteristica]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_caracteristica) => {
    const [result] = await db.execute('DELETE FROM caracteristicas WHERE id_caracteristica = ?', [id_caracteristica]);
    return result.affectedRows > 0;
};