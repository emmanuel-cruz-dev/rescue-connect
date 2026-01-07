import mongoose from "mongoose";
import { IAdoptionRequestDocument } from "../types/adoption.types";

const adoptionRequestSchema = new mongoose.Schema<IAdoptionRequestDocument>(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected", "cancelled"],
        message: "{VALUE} no es un estado válido",
      },
      default: "pending",
    },
    message: {
      type: String,
      trim: true,
      maxlength: [300, "El mensaje no puede superar 300 caracteres"],
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [300, "Las notas del admin no pueden superar 300 caracteres"],
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

adoptionRequestSchema.index({ petId: 1, status: 1 });
adoptionRequestSchema.index({ userId: 1, status: 1 });
adoptionRequestSchema.index({ status: 1, createdAt: -1 });

adoptionRequestSchema.index(
  { petId: 1, userId: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "pending" },
  }
);

export default mongoose.model<IAdoptionRequestDocument>(
  "AdoptionRequest",
  adoptionRequestSchema
);
