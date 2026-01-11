type UserRole = 'user' | 'admin';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}
