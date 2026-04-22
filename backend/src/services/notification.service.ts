import userSchema from "../schemas/user.schema";
import notificationModel from "../models/notification.model";
import socketService from "../services/socket.service";
import emailService from "../services/email.service";
import { NotifyOptions, NotificationType } from "../types";

const notificationTitles: Record<NotificationType, string> = {
  adoption_approved: "¡Solicitud aprobada!",
  adoption_rejected: "Solicitud rechazada",
  adoption_cancelled: "Solicitud cancelada",
  adoption_created: "Nueva solicitud de adopción",
};

const notificationMessages: Record<
  NotificationType,
  (petName: string) => string
> = {
  adoption_approved: (pet) =>
    `Tu solicitud de adopción para ${pet} fue aprobada. ¡Felicitaciones!`,
  adoption_rejected: (pet) =>
    `Tu solicitud de adopción para ${pet} fue rechazada.`,
  adoption_cancelled: (pet) =>
    `Tu solicitud de adopción para ${pet} fue cancelada.`,
  adoption_created: (pet) =>
    `Se recibió una nueva solicitud de adopción para ${pet}.`,
};

class NotificationService {
  async notify(options: NotifyOptions): Promise<void> {
    const { userId, type, petName, requestId, adminNotes } = options;

    const title = notificationTitles[type];
    const message = notificationMessages[type](petName);

    const notification = await notificationModel.create({
      userId: userId as any,
      type,
      title,
      message,
      read: false,
      metadata: { requestId, petName },
    });

    socketService.emitToUser(userId, "new_notification", {
      _id: (notification as any)._id,
      type,
      title,
      message,
      read: false,
      createdAt: (notification as any).createdAt,
      metadata: { requestId, petName },
    });

    if (
      type === "adoption_approved" ||
      type === "adoption_rejected" ||
      type === "adoption_cancelled"
    ) {
      try {
        const user = await userSchema
          .findById(userId)
          .select("+emailNotifications email firstName lastName");
        if (user && user.emailNotifications !== false) {
          await emailService.sendAdoptionStatusEmail(user.email, {
            userName: `${user.firstName} ${user.lastName}`,
            petName,
            status: type.replace("adoption_", "") as
              | "approved"
              | "rejected"
              | "cancelled",
            adminNotes,
          });
        }
      } catch (err) {
        console.error("❌ Error sending notification email:", err);
      }
    }
  }
}

export default new NotificationService();
