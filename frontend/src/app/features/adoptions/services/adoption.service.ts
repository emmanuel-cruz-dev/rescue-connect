import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ApiResponse, PaginatedApiResponse } from '../../../core/models/api-response.model';
import {
  IAdoptionRequest,
  AdoptionRequestFilters,
  AdoptionRequestPagination,
  CreateAdoptionRequestData,
  ReviewAdoptionRequestData,
} from '../../../core/models/adoption-request.model';

@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private apiService = inject(ApiService);

  public requests = signal<IAdoptionRequest[]>([]);
  public pagination = signal<AdoptionRequestPagination | null>(null);
  public selectedRequest = signal<IAdoptionRequest | null>(null);
  public myRequests = signal<IAdoptionRequest[]>([]);
  public loading = signal<boolean>(false);

  getAllRequests(
    filters?: AdoptionRequestFilters
  ): Observable<PaginatedApiResponse<IAdoptionRequest[]>> {
    this.loading.set(true);

    const queryParams: any = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams[key] = typeof value === 'boolean' ? value.toString() : value;
        }
      });
    }

    return this.apiService.get<any>('/api/v1/adoptions/requests', queryParams).pipe(
      tap((response) => {
        if (Array.isArray(response.data)) {
          this.requests.set(response.data);
          this.pagination.set(response.pagination ?? null);
        }
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error fetching adoption requests:', error);
        this.loading.set(false);
        this.requests.set([]);
        this.pagination.set(null);
        return throwError(() => error);
      })
    );
  }

  getRequestById(requestId: string): Observable<ApiResponse<IAdoptionRequest>> {
    this.loading.set(true);
    return this.apiService.get<any>(`/api/v1/adoptions/requests/${requestId}`).pipe(
      tap((response) => {
        if (response?.data) this.selectedRequest.set(response.data);
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error fetching adoption request:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  getPetRequests(petId: string): Observable<ApiResponse<IAdoptionRequest[]>> {
    this.loading.set(true);
    return this.apiService.get<any>(`/api/v1/adoptions/pets/${petId}/requests`).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        console.error('Error fetching pet requests:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  approveRequest(
    requestId: string,
    data?: ReviewAdoptionRequestData
  ): Observable<ApiResponse<IAdoptionRequest>> {
    this.loading.set(true);
    return this.apiService
      .patch<ApiResponse<IAdoptionRequest>>(
        `/api/v1/adoptions/requests/${requestId}/approve`,
        data ?? {}
      )
      .pipe(
        tap(() => this.loading.set(false)),
        catchError((error) => {
          console.error('Error approving request:', error);
          this.loading.set(false);
          return throwError(() => error);
        })
      );
  }

  rejectRequest(
    requestId: string,
    data?: ReviewAdoptionRequestData
  ): Observable<ApiResponse<IAdoptionRequest>> {
    this.loading.set(true);
    return this.apiService
      .patch<ApiResponse<IAdoptionRequest>>(
        `/api/v1/adoptions/requests/${requestId}/reject`,
        data ?? {}
      )
      .pipe(
        tap(() => this.loading.set(false)),
        catchError((error) => {
          console.error('Error rejecting request:', error);
          this.loading.set(false);
          return throwError(() => error);
        })
      );
  }

  createRequest(
    petId: string,
    data?: CreateAdoptionRequestData
  ): Observable<ApiResponse<IAdoptionRequest>> {
    this.loading.set(true);
    return this.apiService
      .post<ApiResponse<IAdoptionRequest>>(`/api/v1/adoptions/pets/${petId}/request`, data ?? {})
      .pipe(
        tap(() => this.loading.set(false)),
        catchError((error) => {
          console.error('Error creating adoption request:', error);
          this.loading.set(false);
          return throwError(() => error);
        })
      );
  }

  getMyRequests(): Observable<ApiResponse<IAdoptionRequest[]>> {
    this.loading.set(true);
    return this.apiService.get<any>('/api/v1/adoptions/my-requests').pipe(
      tap((response) => {
        if (Array.isArray(response.data)) this.myRequests.set(response.data);
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error fetching my requests:', error);
        this.loading.set(false);
        this.myRequests.set([]);
        return throwError(() => error);
      })
    );
  }

  cancelRequest(requestId: string): Observable<ApiResponse<IAdoptionRequest>> {
    this.loading.set(true);
    return this.apiService
      .patch<ApiResponse<IAdoptionRequest>>(`/api/v1/adoptions/requests/${requestId}/cancel`, {})
      .pipe(
        tap(() => this.loading.set(false)),
        catchError((error) => {
          console.error('Error cancelling request:', error);
          this.loading.set(false);
          return throwError(() => error);
        })
      );
  }

  resetFilters(): void {
    this.requests.set([]);
    this.pagination.set(null);
  }
}
