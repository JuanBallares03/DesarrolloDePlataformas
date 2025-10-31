const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtconfig } = require('../config/db.config');
const UsuariosService = require('../services/usuarios.service');
const EmailService = require('../services/email.service');

// Crear instancia del servicio
const usuariosService = new UsuariosService();

class AuthController {
    async login(req, res) {
        try {
            console.log('🚀 Intentando login con:', req.body.email);
            
            const { email, password } = req.body;
            const user = await usuariosService.findByEmail(email);

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            if (!user.email_verified) {
                return res.status(401).json({ 
                    message: "Debes verificar tu email primero",
                    emailVerified: false 
                });
            }

            const token = jwt.sign(
                { id: user.id_usuario, email: user.Correo_electronico },
                jwtconfig.jwt.secret,
                { expiresIn: jwtconfig.jwt.expiresIn }
            );

            console.log('✅ Login exitoso para:', email);
            res.json({ token, message: "Login exitoso" });
        } catch (error) {
            console.error('❌ Error en login:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            console.log('📥 Iniciando registro con datos:', req.body);
            
            const {
                Nombre1, Nombre2, Apellido1, Apellido2, Correo_electronico,
                Telefono, Fecha_nac, Sexo, Ocupacion, Puntos_xp, password,
                Roles_id_roles, Ubicacion_id_ubicacion, Tipo_documento_id_tipo_id
            } = req.body;

            console.log('🔍 Verificando si existe usuario:', Correo_electronico);
            
            const existingUser = await usuariosService.findByEmail(Correo_electronico);
            if (existingUser) {
                console.log('⚠️ Email ya existe:', Correo_electronico);
                return res.status(400).json({ message: "El email ya está registrado" });
            }

            console.log('🔐 Hasheando contraseña...');
            const hashedPassword = bcrypt.hashSync(password, 10);

            console.log('💾 Creando usuario en base de datos...');
            const user = await usuariosService.create({
                Nombre1, Nombre2, Apellido1, Apellido2, Correo_electronico,
                Telefono, Fecha_nac, Sexo, Ocupacion, Puntos_xp,
                password: hashedPassword, Roles_id_roles,
                Ubicacion_id_ubicacion, Tipo_documento_id_tipo_id
            });

            console.log('✅ Usuario creado con ID:', user.id_usuario);
            console.log('🔑 Generando token de verificación...');
            
            // Crear JWT token para verificación (expira en 24h)
            const verificationToken = jwt.sign(
                { 
                    email: Correo_electronico, 
                    purpose: 'email_verification',
                    userId: user.id_usuario 
                },
                jwtconfig.jwt.secret,
                { expiresIn: '24h' }
            );

            console.log('📝 Guardando token de verificación...');
            await usuariosService.updateVerificationToken(Correo_electronico, verificationToken);
            
            console.log('📧 Enviando email de verificación a:', Correo_electronico);
            await EmailService.sendVerificationEmail(Correo_electronico, verificationToken, Nombre1);

            console.log('✅ Registro completado exitosamente');
            res.status(201).json({
                message: "Usuario creado. Revisa tu email para verificar tu cuenta."
            });
        } catch (error) {
            console.error('❌ Error en registro:', error);
            console.error('❌ Stack:', error.stack);
            res.status(500).json({ message: error.message });
        }
    }

    async verifyEmail(req, res) {
        try {
            console.log('🔍 Verificando email con token:', req.query.token);
            
            const { token } = req.query;

            if (!token) {
                return res.status(400).json({ message: "Token requerido" });
            }

            // Verificar JWT token
            const decoded = jwt.verify(token, jwtconfig.jwt.secret);
            
            if (decoded.purpose !== 'email_verification') {
                return res.status(400).json({ message: "Token inválido" });
            }

            const user = await usuariosService.findByVerificationToken(token);
            
            if (!user) {
                return res.status(400).json({ message: "Token no encontrado o ya usado" });
            }

            await usuariosService.markEmailAsVerified(decoded.email);

            console.log('✅ Email verificado para:', decoded.email);
            res.json({ message: "Email verificado correctamente. Ya puedes iniciar sesión." });
        } catch (error) {
            console.error('❌ Error en verificación:', error);
            
            if (error.name === 'TokenExpiredError') {
                return res.status(400).json({ message: "Token expirado" });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json({ message: "Token inválido" });
            }
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();
