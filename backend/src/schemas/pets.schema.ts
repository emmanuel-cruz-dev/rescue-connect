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
        values: ["perro", "gato", "conejo", "ave"],
        message: "{VALUE} no es un tipo válido",
      },
      lowercase: true,
    },
    age: {
      type: Number,
      required: [true, "La edad es obligatoria"],
      min: [0, "La edad no puede ser negativa"],
      max: [30, "La edad no parece correcta"],
    },
    breed: {
      type: String,
      required: [true, "La raza es obligatoria"],
      trim: true,
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

petSchema.index({ adoptedBy: 1 });
petSchema.index({ adopted: 1 });

export default mongoose.model<IPetDocument>("Pet", petSchema);
