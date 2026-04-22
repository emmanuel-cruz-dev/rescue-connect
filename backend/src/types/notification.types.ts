import { Document, Types } from "mongoose";

export type NotificationType =
  | "adoption_approved"
  | "adoption_rejected"
  | "adoption_cancelled"
  | "adoption_created";

export interface INotification {
  userId: Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  metadata?: Record<string, any>;
}

export interface INotificationDocument extends INotification, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
