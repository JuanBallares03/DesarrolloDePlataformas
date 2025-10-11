const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM chats');
    return rows;
};

exports.findById = async (id_chat) => {
    const [rows] = await db.execute('SELECT * FROM chats WHERE id_chat = ?', [id_chat]);
    return rows[0];
};

exports.create = async (newChat) => {
    const [result] = await db.execute(
        'INSERT INTO chats (id_chat) VALUES (?)',
        [newChat.id_chat]
    );
    return { id_chat: result.insertId, ...newChat};
};

exports.update = async (id_chat, updatedChat) => {
    const [result] = await db.execute(
        'UPDATE chats SET id_chat = ? WHERE id_chat = ?'
        // [updatedChat.id_chat, id_chat]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_chat) => {
    const [result] = await db.execute('DELETE FROM chats WHERE id_chat = ?', [id_chat]);
    return result.affectedRows > 0;
};