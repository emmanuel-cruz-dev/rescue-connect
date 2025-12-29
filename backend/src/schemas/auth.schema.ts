import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../types/user.types";
import { config } from "../config/env";

const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede superar 50 caracteres"],
      match: [nameRegex, "El nombre solo puede contener letras"],
    },
    lastName: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
      minlength: [3, "El apellido debe tener al menos 3 caracteres"],
      maxlength: [50, "El apellido no puede superar 50 caracteres"],
      match: [nameRegex, "El apellido solo puede contener letras"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      trim: true,
      lowercase: true,
      minlength: [3, "El email debe tener al menos 3 caracteres"],
      maxlength: [50, "El email no puede superar 50 caracteres"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingrese un email válido",
      ],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      trim: true,
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
      maxlength: [50, "La contraseña no puede superar 50 caracteres"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "El número de teléfono es obligatorio"],
      trim: true,
      match: [
        /^[0-9+\s()-]+$/,
        "El número de teléfono contiene caracteres inválidos",
      ],
      minlength: [8, "El número de teléfono debe tener al menos 8 caracteres"],
      maxlength: [50, "El número de teléfono no puede superar 50 caracteres"],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [200, "La dirección no puede superar 200 caracteres"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} no es un rol válido",
      },
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(config.bcryptRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return;
  } catch (error: any) {
    throw new Error("Error al guardar la contraseña");
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model<IUserDocument>("User", userSchema);
