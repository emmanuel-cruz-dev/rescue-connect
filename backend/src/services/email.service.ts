import nodemailer from "nodemailer";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"Rescue Connect" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Recuperación de Contraseña - Rescue Connect",
      html: `
        <h1>Recuperación de Contraseña</h1>
        <p>Has solicitado restablecer tu contraseña para Rescue Connect.</p>
        <p>Por favor, haz clic en el siguiente enlace para crear una nueva contraseña:</p>
        <a href="${resetUrl}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
          Restablecer Contraseña
        </a>
        <p style="margin-top: 20px;">Este enlace expirará en 1 hora.</p>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✉️ Password reset email sent securely to ${to}`);
    } catch (error) {
      console.error("❌ Error sending email:", error);
      throw new Error("No se pudo enviar el correo de recuperación");
    }
  }
}

export default new EmailService();
