const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtconfig } = require('../config/db.config');
const UsuariosService = require('../services/usuarios.service');

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UsuariosService.findByEmail(email);

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            const token = jwt.sign(
                { id: user.id_usuario, email: user.Correo_electronico },
                jwtconfig.jwt.secret,
                { expiresIn: jwtconfig.jwt.expiresIn }
             );


            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

async register(req, res) {
  try {
    const {
      Nombre1,
      Nombre2,
      Apellido1,
      Apellido2,
      Correo_electronico,
      Telefono,
      Fecha_nac,
      Sexo,
      Ocupacion,
      Puntos_xp,
      password,
      Roles_id_roles,
      Ubicacion_id_ubicacion,
      Tipo_documento_id_tipo_id
      
    } = req.body;

    const existingUser = await UsuariosService.findByEmail(Correo_electronico);
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await UsuariosService.create({
      Nombre1,
      Nombre2,
      Apellido1,
      Apellido2,
      Correo_electronico,
      Telefono,
      Fecha_nac,
      Sexo,
      Ocupacion,
      Puntos_xp,
      password: hashedPassword,
      Roles_id_roles,
      Ubicacion_id_ubicacion,
      Tipo_documento_id_tipo_id
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      userId: user.id_usuario
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }}
}
module.exports = new AuthController();