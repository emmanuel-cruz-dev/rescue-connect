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

export interface IAdoptionFilters {
  status?: AdoptionStatus;
  petId?: Types.ObjectId | string;
  userId?: Types.ObjectId | string;
  reviewedBy?: Types.ObjectId | string;
  fromDate?: Date;
  toDate?: Date;
}

export interface IAdoptionQueryParams extends IAdoptionFilters {
  page: number;
  limit: number;
  sortBy: "createdAt" | "reviewedAt" | "status";
  order: "asc" | "desc";
}
