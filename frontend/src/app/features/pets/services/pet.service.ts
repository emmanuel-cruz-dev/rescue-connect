import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap, catchError, throwError, BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ApiResponse } from '../../../core/models/api-response.model';
import {
  IPet,
  CreatePetData,
  UpdatePetData,
  PetFilters,
  PetListResponse,
  PetDetailResponse,
} from '../../../core/models/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiService = inject(ApiService);

  private petsSubject = new BehaviorSubject<IPet[]>([]);
  public pets$ = this.petsSubject.asObservable();

  public selectedPet = signal<IPet | null>(null);
  public totalPets = signal<number>(0);
  public loading = signal<boolean>(false);

  getAllPets(filters?: PetFilters): Observable<ApiResponse<PetListResponse> & { count: number }> {
    this.loading.set(true);
    return this.apiService
      .get<ApiResponse<PetListResponse> & { count: number }>('/api/v1/pets', filters)
      .pipe(
        tap((response) => {
          if (response.status === 'success' && response.data) {
            this.petsSubject.next(response.data.pets);
            this.totalPets.set(response.count || response.data.pets.length);
          }
          this.loading.set(false);
        }),
        catchError((error) => {
          console.error('Error fetching pets:', error);
          this.loading.set(false);
          return throwError(() => error);
        })
      );
  }

  getPetById(id: string): Observable<ApiResponse<PetDetailResponse>> {
    this.loading.set(true);
    return this.apiService.get<ApiResponse<PetDetailResponse>>(`/api/v1/pets/${id}`).pipe(
      tap((response) => {
        if (response.status === 'success' && response.data) {
          this.selectedPet.set(response.data.pet);
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

  createPet(data: CreatePetData): Observable<ApiResponse<PetDetailResponse>> {
    this.loading.set(true);
    return this.apiService.post<ApiResponse<PetDetailResponse>>('/api/v1/pets', data).pipe(
      tap((response) => {
        if (response.status === 'success' && response.data) {
          const currentPets = this.petsSubject.value;
          this.petsSubject.next([response.data.pet, ...currentPets]);
          this.totalPets.update((count) => count + 1);
        }
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error creating pet:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  updatePet(id: string, data: UpdatePetData): Observable<ApiResponse<PetDetailResponse>> {
    this.loading.set(true);
    return this.apiService.put<ApiResponse<PetDetailResponse>>(`/api/v1/pets/${id}`, data).pipe(
      tap((response) => {
        if (response.status === 'success' && response.data) {
          const currentPets = this.petsSubject.value;
          const updatedPets = currentPets.map((pet) => (pet._id === id ? response.data?.pet : pet));
          this.petsSubject.next(updatedPets as IPet[]);

          if (this.selectedPet()?._id === id) {
            this.selectedPet.set(response.data.pet);
          }
        }
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error updating pet:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  deletePet(id: string): Observable<ApiResponse<any>> {
    this.loading.set(true);
    return this.apiService.delete<ApiResponse<any>>(`/api/v1/pets/${id}`).pipe(
      tap((response) => {
        if (response.status === 'success') {
          const currentPets = this.petsSubject.value;
          const filteredPets = currentPets.filter((pet) => pet._id !== id);
          this.petsSubject.next(filteredPets);
          this.totalPets.update((count) => count - 1);

          if (this.selectedPet()?._id === id) {
            this.selectedPet.set(null);
          }
        }
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error deleting pet:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  uploadImages(id: string, formData: FormData): Observable<ApiResponse<PetDetailResponse>> {
    this.loading.set(true);
    return this.apiService
      .post<ApiResponse<PetDetailResponse>>(`/api/v1/pets/${id}/images`, formData)
      .pipe(
        tap((response) => {
          if (response.status === 'success' && response.data) {
            const currentPets = this.petsSubject.value;
            const updatedPets = currentPets.map((pet) =>
              pet._id === id ? response.data?.pet : pet
            );
            this.petsSubject.next(updatedPets as IPet[]);

            if (this.selectedPet()?._id === id) {
              this.selectedPet.set(response.data.pet);
            }
          }
          this.loading.set(false);
        }),
        catchError((error) => {
          console.error('Error uploading images:', error);
          this.loading.set(false);
          return throwError(() => error);
        })
      );
  }

  deleteImage(petId: string, publicId: string): Observable<ApiResponse<PetDetailResponse>> {
    this.loading.set(true);

    const encodedPublicId = encodeURIComponent(publicId);
    return this.apiService
      .delete<ApiResponse<PetDetailResponse>>(`/api/v1/pets/${petId}/images/${encodedPublicId}`)
      .pipe(
        tap((response) => {
          if (response.status === 'success' && response.data) {
            const currentPets = this.petsSubject.value;
            const updatedPets = currentPets.map((pet) =>
              pet._id === petId ? response.data?.pet : pet
            );
            this.petsSubject.next(updatedPets as IPet[]);

            if (this.selectedPet()?._id === petId) {
              this.selectedPet.set(response.data.pet);
            }
          }
          this.loading.set(false);
        }),
        catchError((error) => {
          console.error('Error deleting image:', error);
          this.loading.set(false);
          return throwError(() => error);
        })
      );
  }

  getAvailablePets(
    filters?: PetFilters
  ): Observable<ApiResponse<PetListResponse> & { count: number }> {
    const adoptionFilters = { ...filters, adopted: false };
    return this.getAllPets(adoptionFilters);
  }

  getAdoptedPets(
    filters?: PetFilters
  ): Observable<ApiResponse<PetListResponse> & { count: number }> {
    const adoptionFilters = { ...filters, adopted: true };
    return this.getAllPets(adoptionFilters);
  }

  clearSelectedPet(): void {
    this.selectedPet.set(null);
  }

  getCurrentPets(): IPet[] {
    return this.petsSubject.value;
  }

  searchPets(query: string): Observable<ApiResponse<PetListResponse> & { count: number }> {
    return this.getAllPets({ search: query });
  }
}
