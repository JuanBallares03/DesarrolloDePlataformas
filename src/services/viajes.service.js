const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM viajes');
    return rows;
};

exports.findById = async (id_viajes) => {
    const [rows] = await db.execute('SELECT * FROM viajes WHERE id_viajes = ?', [id_viajes]);
    return rows[0];
};

exports.create = async (newviaje) => {
    const [result] = await db.execute(
        'INSERT INTO viajes (Num_personas, Presupuesto,Preferencias_distancia) VALUES (?,?,?)',
        [
            newviaje.Num_personas, 
            newviaje.Preferencias_distancia,
            newviaje.Descripcion
        ]
    );
    return { id_viajes: result.insertId, ...newviaje };
};

exports.update = async (id_viajes, updatedviajes) => {
    const [result] = await db.execute(
        'UPDATE viajes SET Num_personas = ?, Presupuesto = ?, Preferencias_distancia = ? WHERE id_viajes = ?',
        [updatedviajes.Num_personas, updatedviajes.Presupuesto,updatedviajes.Preferencias_distancia,id_viajes]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_viajes) => {
    const [result] = await db.execute('DELETE FROM viajes WHERE id_viajes = ?', [id_viajes]);
    return result.affectedRows > 0;
};