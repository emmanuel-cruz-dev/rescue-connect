import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { ApiService } from '../../../core/services';
import {
  PaginatedApiResponse,
  IUser,
  UserFilters,
  UserPagination,
  ApiResponse,
  AdoptionStatsMonthly,
  DashboardStats,
} from '../../../core/models';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiService = inject(ApiService);

  public users = signal<IUser[]>([]);
  public pagination = signal<UserPagination | null>(null);
  public loading = signal<boolean>(false);

  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.apiService.get<ApiResponse<DashboardStats>>('/api/v1/admin/dashboard');
  }

  getMonthlyStats(year?: number): Observable<ApiResponse<AdoptionStatsMonthly[]>> {
    const params = year ? { year } : {};
    return this.apiService.get<ApiResponse<AdoptionStatsMonthly[]>>(
      '/api/v1/adoptions/stats/monthly',
      params
    );
  }

  getAllUsers(filters?: UserFilters): Observable<PaginatedApiResponse<IUser[]>> {
    this.loading.set(true);

    const queryParams: any = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams[key] = typeof value === 'boolean' ? value.toString() : value;
        }
      });
    }

    return this.apiService.get<any>('/api/v1/users', queryParams).pipe(
      tap((response) => {
        if (Array.isArray(response.data)) {
          this.users.set(response.data);
          this.pagination.set(response.pagination ?? null);
        }
        this.loading.set(false);
      }),
      catchError((error) => {
        this.loading.set(false);
        this.users.set([]);
        this.pagination.set(null);
        return throwError(() => error);
      })
    );
  }

  toggleUserStatus(id: string, isActive: boolean): Observable<any> {
    return this.apiService
      .put(`/api/v1/users/${id}`, { isActive })
      .pipe(catchError((error) => throwError(() => error)));
  }

  deleteUser(id: string): Observable<any> {
    return this.apiService
      .delete(`/api/v1/users/${id}`)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
