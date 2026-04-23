import nodemailer from "nodemailer";

import { renderTemplate } from "../utils";

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

  async sendAdoptionStatusEmail(
    to: string,
    data: {
      userName: string;
      petName: string;
      status: "approved" | "rejected" | "cancelled";
      adminNotes?: string;
    }
  ): Promise<void> {
    const statusConfig = {
      approved: {
        title: "¡Tu solicitud fue aprobada!",
        preview: "Tu solicitud de adopción fue aprobada",
        statusLabel: "Aprobada",
        statusIcon: "✅",
        statusBg: "#f0fdf4",
        statusColor: "#16a34a",
        bodyText: `¡Buenas noticias! Tu solicitud de adopción para <strong>${data.petName}</strong> ha sido aprobada. Pronto nos pondremos en contacto contigo para coordinar los siguientes pasos.`,
      },
      rejected: {
        title: "Tu solicitud fue rechazada",
        preview: "Tu solicitud de adopción fue rechazada",
        statusLabel: "Rechazada",
        statusIcon: "❌",
        statusBg: "#fef2f2",
        statusColor: "#dc2626",
        bodyText: `Lamentablemente, tu solicitud de adopción para <strong>${data.petName}</strong> no fue aprobada en esta oportunidad.`,
      },
      cancelled: {
        title: "Tu solicitud fue cancelada",
        preview: "Tu solicitud de adopción fue cancelada",
        statusLabel: "Cancelada",
        statusIcon: "⚠️",
        statusBg: "#fffbeb",
        statusColor: "#d97706",
        bodyText: `Tu solicitud de adopción para <strong>${data.petName}</strong> ha sido cancelada.`,
      },
    };

    const config = statusConfig[data.status];
    const adoptionsUrl = `${process.env.FRONTEND_URL}/profile/my-requests`;
    const date = new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const html = renderTemplate("adoptionStatus", {
      title: config.title,
      preview: config.preview,
      statusLabel: config.statusLabel,
      statusIcon: config.statusIcon,
      statusBg: config.statusBg,
      statusColor: config.statusColor,
      bodyText: config.bodyText,
      userName: data.userName,
      petName: data.petName,
      adminNotes: data.adminNotes
        ? `<strong>Nota del administrador:</strong> ${data.adminNotes}`
        : "",
      adoptionsUrl,
      date,
    });

    const mailOptions = {
      from: `"Rescue Connect" <${process.env.EMAIL_USER}>`,
      to,
      subject: `${config.title} - Rescue Connect`,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✉️  Adoption status email (${data.status}) sent to ${to}`);
    } catch (error) {
      console.error("❌ Error sending adoption status email:", error);
    }
  }
}

export default new EmailService();
