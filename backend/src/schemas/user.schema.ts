import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../types";

const userSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidate: string) {
  return await bcrypt.compare(candidate, this.password);
};

userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ role: 1, isActive: 1 });

userSchema.index({ firstName: 1 });
userSchema.index({ lastName: 1 });

userSchema.index({ createdAt: -1 });

export default mongoose.models.User ||
  mongoose.model<IUserDocument>("User", userSchema);
