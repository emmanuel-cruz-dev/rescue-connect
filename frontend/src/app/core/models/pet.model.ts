import { PetType } from '../enums/pet-type.enum';

export interface IPetImage {
  _id: string;
  url: string;
  publicId: string;
}

export interface IPet {
  _id: string;
  name: string;
  type: PetType;
  birthDate: Date;
  breed: string;
  description?: string;
  adopted: boolean;
  adoptedBy: string | null;
  images: IPetImage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreatePetData {
  name: string;
  type: PetType;
  age: number;
  breed: string;
  description?: string;
}

export interface UpdatePetData {
  name?: string;
  type?: PetType;
  age?: number;
  breed?: string;
  description?: string;
}

export interface PetFilters {
  type?: string;
  adopted?: boolean;
  minAge?: number;
  maxAge?: number;
  breed?: string;
  search?: string;
}

export interface PetListResponse {
  pets: IPet[];
}

export interface PetDetailResponse {
  pet: IPet;
}
