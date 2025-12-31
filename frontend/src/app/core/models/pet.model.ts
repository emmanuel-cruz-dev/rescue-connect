import { PetType } from '../enums/pet-type.enum';

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
  adoptedBy?: string;
}
