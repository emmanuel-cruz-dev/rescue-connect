import { Document, Types } from "mongoose";

type PetType = "perro" | "gato";

export interface IPetImage {
  url: string;
  publicId: string;
}

export interface IPet {
  name: string;
  type: PetType;
  age: number;
  breed: string;
  description?: string;
  images?: IPetImage[];
  adopted: boolean;
  adoptedBy?: Types.ObjectId;
}

export interface IPetDocument extends IPet, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
