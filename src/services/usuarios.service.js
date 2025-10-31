const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const config = require('../config/db.config');

class UsuariosService {
    constructor() {
        this.db = config.db;
    }

    async findAll() {
        const [rows] = await this.db.execute('SELECT * FROM usuarios');
        return rows;
    }

    async findById(id_usuario) {
        const [rows] = await this.db.execute('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
        return rows[0];
    }
    async findByEmail(email) {
        const [rows] = await this.db.execute(
            'SELECT * FROM usuarios WHERE Correo_electronico = ?',[email]
        );
        return rows[0];
    }

    async create(newUser) {
        const [result] = await this.db.execute(
            'INSERT INTO usuarios (Nombre1, Nombre2, Apellido1, Apellido2, Correo_electronico, Telefono, Fecha_nac, Sexo, Ocupacion, Puntos_xp,password, Roles_id_roles, Ubicacion_id_ubicacion, Tipo_documento_id_tipo_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                newUser.Nombre1, 
                newUser.Nombre2,
                newUser.Apellido1,
                newUser.Apellido2,
                newUser.Correo_electronico,
                newUser.Telefono,
                newUser.Fecha_nac,
                newUser.Sexo,
                newUser.Ocupacion,
                newUser.Puntos_xp,
                newUser.password,
                newUser.Roles_id_roles,
                newUser.Ubicacion_id_ubicacion,
                newUser.Tipo_documento_id_tipo_id
            ]
        );
        return { id_usuario: result.insertId, ...newUser };
    }

    async update(id_usuario, updatedUser) {
        const [result] = await this.db.execute(
            'UPDATE usuarios SET Nombre1 = ?, Nombre2 = ?, Apellido1 = ?, Apellido2 = ?, Correo_electronico = ?, Telefono = ?, Fecha_nac = ?, Sexo = ?, Ocupacion = ?, Puntos_xp = ? WHERE id_usuario = ?',
            [
                updatedUser.Nombre1, updatedUser.Nombre2, updatedUser.Apellido1, updatedUser.Apellido2,
                updatedUser.Correo_electronico, updatedUser.Telefono, updatedUser.Fecha_nac, updatedUser.Sexo,
                updatedUser.Ocupacion, updatedUser.Puntos_xp, id_usuario
            ]
        );
        return result.affectedRows > 0;
    }

    async remove(id_usuario) {
        const [result] = await this.db.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
        return result.affectedRows > 0;
    }
        async updateVerificationToken(email, token) {
        const [result] = await this.db.execute(
            'UPDATE usuarios SET verification_token = ? WHERE Correo_electronico = ?',
            [token, email]
        );
        return result.affectedRows > 0;
    }

    async findByVerificationToken(token) {
        const [rows] = await this.db.execute(
            'SELECT * FROM usuarios WHERE verification_token = ?',
            [token]
        );
        return rows[0];
    }

    async markEmailAsVerified(email) {
        const [result] = await this.db.execute(
            'UPDATE usuarios SET email_verified = TRUE, verification_token = NULL WHERE Correo_electronico = ?',
            [email]
        );
        return result.affectedRows > 0;
    }

}

// buscar usuario por correo

module.exports = UsuariosService;