import { Document, Types } from "mongoose";

type PetType = "perro" | "gato";
type PetGender = "macho" | "hembra";
type PetSize = "pequeño" | "mediano" | "grande" | "extra grande";

export interface IPetImage {
  url: string;
  publicId: string;
}

export interface IPet {
  name: string;
  type: PetType;
  birthDate: Date;
  gender: PetGender;
  size: PetSize;
  breed: string;
  description?: string;
  images?: IPetImage[];
  isSterilized: boolean;
  isVaccinated: boolean;
  adopted: boolean;
  adoptedBy?: Types.ObjectId;
}

export interface IPetDocument extends IPet, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPetFilters {
  adopted?: boolean;
  type?: PetType;
  gender?: PetGender;
  size?: PetSize;
  isSterilized?: boolean;
  isVaccinated?: boolean;
  minAge?: number;
  maxAge?: number;
  search?: string;
}

export interface IPetQueryParams extends IPetFilters {
  page: number;
  limit: number;
  sortBy: "createdAt" | "name" | "birthDate";
  order: "asc" | "desc";
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
