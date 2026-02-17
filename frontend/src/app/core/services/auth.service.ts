import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { IUser } from '../models/user.model';
import { LoginResponse } from '../models/auth-response.model';
import { ApiResponse } from '../models/api-response.model';
import {
  LoginData,
  RegisterData,
  UpdateProfileData,
  ChangePasswordData,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);
  private storageService = inject(StorageService);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  public isAuthenticated = signal<boolean>(false);
  public currentUser = signal<IUser | null>(null);

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = this.storageService.getToken();
    const user = this.storageService.getUser();

    if (token && user) {
      this.setCurrentUser(user);
    }
  }

  login(credentials: LoginData): Observable<ApiResponse<LoginResponse>> {
    return this.apiService.post<ApiResponse<LoginResponse>>('/api/v1/auth/login', credentials).pipe(
      tap((response) => {
        if (response.success && response.data) {
          this.storageService.saveToken(response.data.tokens.accessToken);
          this.storageService.saveUser(response.data.user);
          this.setCurrentUser(response.data.user);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  register(data: RegisterData): Observable<ApiResponse<LoginResponse>> {
    return this.apiService.post<ApiResponse<LoginResponse>>('/api/v1/auth/register', data).pipe(
      tap((response) => {
        if (response.success && response.data) {
          this.storageService.saveToken(response.data.tokens.accessToken);
          this.storageService.saveUser(response.data.user);
          this.setCurrentUser(response.data.user);
        }
      }),
      catchError((error) => {
        console.error('Register error:', error);
        return throwError(() => error);
      })
    );
  }

  getProfile(): Observable<ApiResponse<IUser>> {
    return this.apiService.get<ApiResponse<IUser>>('/api/v1/auth/profile').pipe(
      tap((response) => {
        if (response.success && response.data) {
          this.storageService.saveUser(response.data);
          this.setCurrentUser(response.data);
        }
      })
    );
  }

  updateProfile(data: UpdateProfileData): Observable<ApiResponse<IUser>> {
    return this.apiService.put<ApiResponse<IUser>>('/api/v1/auth/profile', data).pipe(
      tap((response) => {
        if (response.success && response.data) {
          this.storageService.saveUser(response.data);
          this.setCurrentUser(response.data);
        }
      })
    );
  }

  changePassword(data: ChangePasswordData): Observable<ApiResponse<any>> {
    return this.apiService.post<ApiResponse<any>>('/api/v1/auth/change-password', data);
  }

  logout(): Observable<ApiResponse<any>> {
    return this.apiService.post<ApiResponse<any>>('/api/v1/auth/logout', {}).pipe(
      tap(() => {
        this.clearSession();
        this.router.navigate(['/auth/login']);
      }),
      catchError((error) => {
        this.clearSession();
        this.router.navigate(['/auth/login']);
        return throwError(() => error);
      })
    );
  }

  logoutLocal(): void {
    this.clearSession();
    this.router.navigate(['/auth/login']);
  }

  getMyPets(): Observable<ApiResponse<any[]>> {
    return this.apiService.get<ApiResponse<any[]>>('/api/v1/auth/my-pets');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getCurrentUser(): IUser | null {
    return this.currentUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  getToken(): string | null {
    return this.storageService.getToken();
  }

  private setCurrentUser(user: IUser): void {
    this.currentUserSubject.next(user);
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private clearSession(): void {
    this.storageService.clearAuth();
    this.currentUserSubject.next(null);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
