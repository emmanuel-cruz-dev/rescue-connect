import nodemailer from "nodemailer";
import { renderTemplate } from "../utils/renderTemplate";

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

    const html = renderTemplate("resetPassword", {
      resetUrl,
      title: "Restablecer contraseña",
      preview: "Haz clic para restablecer tu contraseña",
    });

    const mailOptions = {
      from: `"Rescue Connect" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Recuperación de Contraseña - Rescue Connect",
      html,
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
