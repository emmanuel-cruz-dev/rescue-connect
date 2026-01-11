import { IUser } from './user.model';

export interface LoginResponse {
  user: IUser;
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
}
