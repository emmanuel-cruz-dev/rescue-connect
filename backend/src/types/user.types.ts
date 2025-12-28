import { Document, Types } from "mongoose";

type UserRole = "admin" | "user";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
  isActive: boolean;
}

export interface IUserDocument extends Omit<IUser, "password">, Document {
  _id: Types.ObjectId;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserResponse extends Omit<IUser, "password"> {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthTokens {
  accessToken: string;
}

export interface IAuthResponse {
  user: IUserResponse;
  tokens: IAuthTokens;
}

export interface IJWTPayload {
  userId: string;
  email: string;
  role: string;
}
