import { Types } from "mongoose";

import { notificationModel } from "../schemas";
import { INotificationDocument, INotification } from "../types";

class NotificationModel {
  async create(data: INotification): Promise<INotificationDocument> {
    return notificationModel.create(data);
  }

  async getByUser(
    userId: string | Types.ObjectId,
    onlyUnread = false
  ): Promise<INotificationDocument[]> {
    const filter: any = { userId };
    if (onlyUnread) filter.read = false;

    return notificationModel
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean() as unknown as INotificationDocument[];
  }

  async markAsRead(
    notificationId: string,
    userId: string | Types.ObjectId
  ): Promise<INotificationDocument | null> {
    return notificationModel.findOneAndUpdate(
      { _id: notificationId, userId },
      { read: true },
      { new: true }
    );
  }

  async markAllAsRead(userId: string | Types.ObjectId): Promise<void> {
    await notificationModel.updateMany({ userId, read: false }, { read: true });
  }

  async getUnreadCount(userId: string | Types.ObjectId): Promise<number> {
    return notificationModel.countDocuments({ userId, read: false });
  }

  async delete(
    notificationId: string,
    userId: string | Types.ObjectId
  ): Promise<INotificationDocument | null> {
    return notificationModel.findOneAndDelete({ _id: notificationId, userId });
  }
}

export default new NotificationModel();
