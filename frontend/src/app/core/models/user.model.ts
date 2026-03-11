type UserRole = 'user' | 'admin';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  sortBy?: 'createdAt' | 'firstName' | 'lastName' | 'email';
  order?: 'asc' | 'desc';
}

export interface UserPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface UpdateProfileResponse {
  user: IUser;
}
