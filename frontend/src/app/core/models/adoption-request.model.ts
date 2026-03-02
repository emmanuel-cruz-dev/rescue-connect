import { IPet } from './pet.model';
import { IUser } from './user.model';

export type AdoptionStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface IAdoptionRequest {
  _id: string;
  petId: Pick<IPet, '_id' | 'name' | 'type' | 'breed' | 'images'>;
  userId: Pick<IUser, '_id' | 'firstName' | 'lastName' | 'email'> | null;
  status: AdoptionStatus;
  message?: string;
  adminNotes?: string;
  reviewedBy: Pick<IUser, '_id' | 'firstName' | 'lastName' | 'email'> | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdoptionRequestFilters {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'reviewedAt' | 'status';
  order?: 'asc' | 'desc';
  status?: AdoptionStatus;
  petId?: string;
  userId?: string;
  reviewedBy?: string;
  fromDate?: string;
  toDate?: string;
}

export interface AdoptionRequestPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CreateAdoptionRequestData {
  message?: string;
}

export interface ReviewAdoptionRequestData {
  adminNotes?: string;
}
