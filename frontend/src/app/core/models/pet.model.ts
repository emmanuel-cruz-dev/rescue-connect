import { PetType, PetGender, PetSize } from '../enums/pet-type.enum';
import { Pagination } from './api-response.model';

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
  gender: PetGender;
  size: PetSize;
  breed: string;
  description?: string;
  isSterilized: boolean;
  isVaccinated: boolean;
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
  birthDate: Date;
  gender: PetGender;
  size: PetSize;
  breed: string;
  description?: string;
  isSterilized?: boolean;
  isVaccinated?: boolean;
}

export interface UpdatePetData {
  name?: string;
  type?: PetType;
  birthDate?: Date;
  gender?: PetGender;
  size?: PetSize;
  breed?: string;
  description?: string;
  isSterilized?: boolean;
  isVaccinated?: boolean;
}

export interface PetFilters {
  page?: number;
  limit?: number;
  adopted?: boolean;
  type?: PetType;
  gender?: PetGender;
  size?: PetSize;
  minAge?: number;
  maxAge?: number;
  search?: string;
  isSterilized?: boolean;
  isVaccinated?: boolean;
  sortBy?: 'createdAt' | 'name' | 'birthDate';
  order?: 'asc' | 'desc';
}

export type PetPagination = Pagination;
