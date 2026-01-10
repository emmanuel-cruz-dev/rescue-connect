import { IUser } from './user.model';

export interface LoginResponse {
  token: string;
  user: IUser;
}
