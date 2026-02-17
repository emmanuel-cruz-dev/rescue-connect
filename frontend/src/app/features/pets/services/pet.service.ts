import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ApiResponse, PaginatedApiResponse } from '../../../core/models/api-response.model';
import {
  IPet,
  CreatePetData,
  UpdatePetData,
  PetFilters,
  PetPagination,
} from '../../../core/models/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiService = inject(ApiService);

  public pets = signal<IPet[]>([]);
  public pagination = signal<PetPagination | null>(null);
  public selectedPet = signal<IPet | null>(null);
  public loading = signal<boolean>(false);

  getAllPets(filters?: PetFilters): Observable<PaginatedApiResponse<IPet[]>> {
    this.loading.set(true);

    const queryParams: any = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'boolean') {
            queryParams[key] = value.toString();
          } else {
            queryParams[key] = value;
          }
        }
      });
    }

    return this.apiService.get<any>('/api/v1/pets', queryParams).pipe(
      tap((response) => {
        if (Array.isArray(response.data) && response.data.length >= 0) {
          this.pets.set(response.data);
          this.pagination.set(response.pagination ?? null);
        }
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error fetching pets:', error);
        this.loading.set(false);
        this.pets.set([]);
        this.pagination.set(null);
        return throwError(() => error);
      })
    );
  }

  getPetById(id: string): Observable<ApiResponse<IPet>> {
    this.loading.set(true);
    return this.apiService.get<ApiResponse<IPet>>(`/api/v1/pets/${id}`).pipe(
      tap((response) => {
        if (response.success && response.data) {
          this.selectedPet.set(response.data);
        }
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error fetching pet:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  createPet(petData: CreatePetData): Observable<ApiResponse<IPet>> {
    this.loading.set(true);
    return this.apiService.post<ApiResponse<IPet>>('/api/v1/pets', petData).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        console.error('Error creating pet:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  updatePet(id: string, petData: UpdatePetData): Observable<ApiResponse<IPet>> {
    this.loading.set(true);
    return this.apiService.put<ApiResponse<IPet>>(`/api/v1/pets/${id}`, petData).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        console.error('Error updating pet:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  deletePet(id: string): Observable<ApiResponse<void>> {
    this.loading.set(true);
    return this.apiService.delete<ApiResponse<void>>(`/api/v1/pets/${id}`).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        console.error('Error deleting pet:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  uploadImages(petId: string, files: File[]): Observable<ApiResponse<IPet>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    this.loading.set(true);
    return this.apiService.post<ApiResponse<IPet>>(`/api/v1/pets/${petId}/images`, formData).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        console.error('Error uploading images:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  deleteImage(petId: string, publicId: string): Observable<ApiResponse<IPet>> {
    this.loading.set(true);
    return this.apiService
      .delete<ApiResponse<IPet>>(`/api/v1/pets/${petId}/images/${publicId}`)
      .pipe(
        tap(() => this.loading.set(false)),
        catchError((error) => {
          console.error('Error deleting image:', error);
          this.loading.set(false);
          return throwError(() => error);
        })
      );
  }

  resetFilters(): void {
    this.pets.set([]);
    this.pagination.set(null);
  }
}
