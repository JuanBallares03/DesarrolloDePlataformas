const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM feed');
    return rows;
};

exports.findById = async (id_feed) => {
    const [rows] = await db.execute('SELECT * FROM feed WHERE id_feed = ?', [id_feed]);
    return rows[0];
};

exports.create = async (newFeed) => {
    const [result] = await db.execute(
        'INSERT INTO feed (Descripcion, Likes, Fecha_publi) VALUES (?,?,?,?)',
        [
            newFeed.Descripcion,
            newFeed.Likes,
            newFeed.Fecha_publi
        ]
    );
    return { id_feed: result.insertId, ...newFeed};
};

exports.update = async (id_feed, updatedFeed) => {
    const [result] = await db.execute(
        'UPDATE feed SET Descripcion = ? , Likes = ? , Fecha_publi = ? WHERE id = ?',
        [updatedFeed.Descripcion,updatedFeed.Likes,updatedFeed.Fecha_publi, id_feed]);
    return result.affectedRows > 0;
};
exports.remove = async (id_feed) => {
    const [result] = await db.execute('DELETE FROM feed WHERE id_feed = ?', [id_feed]);
    return result.affectedRows > 0;
};