import { Component, inject, OnInit, signal, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

import { PetService } from '../../../pets/services/pet.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IPetImage } from '../../../../core/models';

@Component({
  selector: 'app-pet-form',
  imports: [RouterModule, ReactiveFormsModule, PRIMENG_IMPORTS],
  providers: [MessageService],
  templateUrl: './pet-form.html',
})
export class PetForm implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private petService = inject(PetService);
  private messageService = inject(MessageService);
  private timeoutRef: ReturnType<typeof setTimeout> | null = null;
  readonly MAX_IMAGES = 5;

  isEditMode = !!this.route.snapshot.paramMap.get('id');
  petId = this.route.snapshot.paramMap.get('id');

  saving = signal(false);
  loadingPet = signal(false);
  formSubmitted = signal(false);
  currentImages = signal<IPetImage[]>([]);
  @ViewChild('fu') fileUpload!: FileUpload;
  today = new Date();

  petTypeOptions = [
    { label: 'Perro', value: 'perro' },
    { label: 'Gato', value: 'gato' },
  ];

  genderOptions = [
    { label: 'Macho', value: 'macho' },
    { label: 'Hembra', value: 'hembra' },
  ];

  sizeOptions = [
    { label: 'Pequeño', value: 'pequeño' },
    { label: 'Mediano', value: 'mediano' },
    { label: 'Grande', value: 'grande' },
    { label: 'Extra Grande', value: 'extra grande' },
  ];

  petForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    type: [null, Validators.required],
    birthDate: [null, Validators.required],
    gender: [null, Validators.required],
    size: [null, Validators.required],
    breed: ['', [Validators.maxLength(50)]],
    description: [''],
    isSterilized: [false],
    isVaccinated: [false],
  });

  totalImagesCount = signal(0);

  private syncPendingFiles(): void {
    setTimeout(() => {
      const files = this.fileUpload?.files ?? [];
      const available = this.MAX_IMAGES - this.currentImages().length;

      if (files.length > available) {
        this.fileUpload.files = files.slice(0, available);
        this.messageService.add({
          severity: 'warn',
          summary: 'Límite alcanzado',
          detail: `Solo podés subir hasta ${this.MAX_IMAGES} imágenes.`,
        });
      }

      this.totalImagesCount.set(
        this.currentImages().length + (this.fileUpload?.files?.length ?? 0)
      );
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.petId) {
      this.loadingPet.set(true);
      this.petService.getPetById(this.petId).subscribe({
        next: (response: any) => {
          const pet = response?.data?.pet ?? response?.data;
          if (pet) {
            this.petForm.patchValue({
              name: pet.name,
              type: pet.type,
              birthDate: pet.birthDate ? new Date(pet.birthDate) : null,
              gender: pet.gender,
              size: pet.size,
              breed: pet.breed ?? '',
              description: pet.description ?? '',
              isSterilized: pet.isSterilized ?? false,
              isVaccinated: pet.isVaccinated ?? false,
            });
            this.currentImages.set(pet.images ?? []);
            this.totalImagesCount.set(pet.images?.length ?? 0);
          }
          this.loadingPet.set(false);
        },
        error: () => {
          this.loadingPet.set(false);
        },
      });
    }
  }

  get f() {
    return this.petForm.controls;
  }

  onFilesSelected(): void {
    this.syncPendingFiles();
  }

  onFileRemoved(): void {
    this.syncPendingFiles();
  }

  onSubmit(): void {
    this.formSubmitted.set(true);
    if (this.petForm.invalid) return;
    const filesToUpload = this.fileUpload?.files ?? [];

    this.saving.set(true);

    const formValue = { ...this.petForm.value };

    if (!formValue.breed || formValue.breed.trim() === '') {
      delete formValue.breed;
    }

    if (this.isEditMode && this.petId) {
      this.petService.updatePet(this.petId, formValue).subscribe({
        next: () => {
          if (filesToUpload.length > 0) {
            this.petService.uploadImages(this.petId!, filesToUpload).subscribe({
              next: (response) => {
                const updatedPet = response?.data;
                if (updatedPet?.images) this.currentImages.set(updatedPet.images);
                this.fileUpload.clear();
                this.totalImagesCount.set(this.currentImages().length);
                this.onSuccess('Mascota actualizada correctamente');
              },
              error: () => this.handleUploadError(),
            });
          } else {
            this.onSuccess('Mascota actualizada correctamente');
          }
        },
        error: (err) => this.onError(err),
      });
    } else {
      this.petService.createPet(formValue).subscribe({
        next: (response: any) => {
          const newPetId = response.data.pet._id;
          if (filesToUpload.length > 0 && newPetId) {
            this.petService.uploadImages(newPetId, filesToUpload).subscribe({
              next: (response) => {
                const updatedPet = response?.data;
                if (updatedPet?.images) this.currentImages.set(updatedPet.images);
                this.fileUpload.clear();
                this.totalImagesCount.set(this.currentImages().length);
                this.onSuccess('Mascota creada correctamente');
              },
              error: () => this.handleUploadError(),
            });
          } else {
            this.onSuccess('Mascota creada correctamente');
          }
        },
        error: (err) => this.onError(err),
      });
    }
  }

  deleteImage(publicId: string): void {
    if (!this.petId) return;
    this.petService.deleteImage(this.petId, publicId).subscribe({
      next: (response: any) => {
        const updatedImages = response.data.pet.images ?? [];
        this.currentImages.set(updatedImages);
        this.messageService.add({
          severity: 'success',
          summary: 'Imagen eliminada',
          detail: 'La imagen fue eliminada correctamente',
        });
      },
      error: () => {
        throw new Error('Error al eliminar la imagen');
      },
    });
  }

  private onSuccess(detail: string): void {
    this.saving.set(false);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail, life: 1500 });
    this.timeoutRef = setTimeout(() => this.router.navigate(['/admin/pets']), 1000);
  }

  private handleUploadError() {
    this.saving.set(false);
    this.messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'Mascota guardada, pero hubo un error al subir las imágenes',
    });
    this.timeoutRef = setTimeout(() => this.router.navigate(['/admin/pets']), 1500);
  }

  private onError(err: any): void {
    this.saving.set(false);
    const detail = err?.error?.message ?? err?.message ?? 'Ocurrió un error inesperado';
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }

  ngOnDestroy(): void {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
  }
}
