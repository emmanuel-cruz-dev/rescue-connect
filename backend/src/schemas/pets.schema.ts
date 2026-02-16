import mongoose from "mongoose";
import { IPetDocument } from "../types/pet.types";

const petSchema = new mongoose.Schema<IPetDocument>(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede superar 50 caracteres"],
    },
    type: {
      type: String,
      required: [true, "El tipo de mascota es obligatorio"],
      enum: {
        values: ["perro", "gato"],
        message: "{VALUE} no es un tipo válido",
      },
      lowercase: true,
    },
    birthDate: {
      type: Date,
      required: [true, "La fecha de nacimiento es obligatoria"],
    },
    gender: {
      type: String,
      required: [true, "El género es obligatorio"],
      enum: ["macho", "hembra"],
      lowercase: true,
    },
    size: {
      type: String,
      required: [true, "el tamaño es obligatorio"],
      enum: ["pequeño", "mediano", "grande", "extra grande"],
      default: "mediano",
    },
    breed: {
      type: String,
      trim: true,
      default: "mestizo",
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "La descripción no puede superar 200 caracteres"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    isSterilized: { type: Boolean, default: false },
    isVaccinated: { type: Boolean, default: false },
    adopted: {
      type: Boolean,
      default: false,
    },
    adoptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

petSchema.index({ adopted: 1 });
petSchema.index({ type: 1 });
petSchema.index({ adoptedBy: 1 });

petSchema.index({ name: "text", breed: "text", description: "text" });
petSchema.index({ adopted: 1, type: 1, gender: 1, size: 1 });
petSchema.index({ createdAt: -1 });
petSchema.index({ birthDate: 1 });

export default mongoose.model<IPetDocument>("Pet", petSchema);
