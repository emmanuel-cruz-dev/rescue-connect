import { Document, Types } from "mongoose";

type PetType = "perro" | "gato" | "conejo" | "ave";

export interface IPet {
  name: string;
  type: PetType;
  age: number;
  breed: string;
  description?: string;
  adopted: boolean;
  adoptedBy?: Types.ObjectId;
}

export interface IPetDocument extends IPet, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
