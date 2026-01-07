import { Document, Types } from "mongoose";

export type AdoptionStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface IAdoptionRequest {
  petId: Types.ObjectId;
  userId: Types.ObjectId;
  status: AdoptionStatus;
  message?: string;
  adminNotes?: string;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
}

export interface IAdoptionRequestDocument extends IAdoptionRequest, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
