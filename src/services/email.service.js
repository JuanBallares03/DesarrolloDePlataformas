const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({  // ← CORREGIDO
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendVerificationEmail(email, jwtToken, name) {
        const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${jwtToken}`;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Verificar tu correo electrónico',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>¡Hola ${name}!</h2>
                    <p>Gracias por registrarte en nuestra plataforma.</p>
                    <p>Para completar tu registro, haz clic en el siguiente enlace:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background-color: #007bff; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Verificar Email
                        </a>
                    </div>
                    <p style="color: #666; font-size: 14px;">
                        Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:
                    </p>
                    <p style="color: #666; font-size: 12px; word-break: break-all;">
                        ${verificationUrl}
                    </p>
                    <p style="color: #999; font-size: 12px;">
                        Este enlace expira en 24 horas.
                    </p>
                </div>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Error enviando email:', error);
            return false;
        }
    }
}

module.exports = new EmailService();
