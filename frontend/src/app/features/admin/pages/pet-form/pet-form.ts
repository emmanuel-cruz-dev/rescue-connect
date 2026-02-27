import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PetService } from '../../../pets/services/pet.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IPetImage } from '../../../../core/models/pet.model';

@Component({
  selector: 'app-pet-form',
  imports: [RouterModule, ReactiveFormsModule, PRIMENG_IMPORTS],
  templateUrl: './pet-form.html',
  providers: [MessageService],
})
export class PetForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private petService = inject(PetService);
  private messageService = inject(MessageService);

  isEditMode = !!this.route.snapshot.paramMap.get('id');
  petId = this.route.snapshot.paramMap.get('id');

  saving = signal(false);
  loadingPet = signal(false);
  formSubmitted = signal(false);
  currentImages = signal<IPetImage[]>([]);
  pendingFiles: File[] = [];
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
    breed: [''],
    description: [''],
    isSterilized: [false],
    isVaccinated: [false],
  });

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

  onFilesSelected(event: any): void {
    this.pendingFiles = event.currentFiles ?? event.files ?? [];
  }

  onSubmit(): void {
    this.formSubmitted.set(true);
    if (this.petForm.invalid) return;

    this.saving.set(true);
    const formValue = this.petForm.value;

    if (this.isEditMode && this.petId) {
      this.petService.updatePet(this.petId, formValue).subscribe({
        next: () => {
          if (this.pendingFiles.length > 0) {
            this.petService.uploadImages(this.petId!, this.pendingFiles).subscribe({
              next: () => this.onSuccess('Mascota actualizada correctamente'),
              error: () => {
                this.saving.set(false);
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Advertencia',
                  detail: 'Mascota guardada, pero hubo un error al subir las imágenes',
                });
                this.router.navigate(['/admin/pets']);
              },
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
          if (this.pendingFiles.length > 0 && newPetId) {
            this.petService.uploadImages(newPetId, this.pendingFiles).subscribe({
              next: () => this.onSuccess('Mascota creada correctamente'),
              error: () => {
                this.saving.set(false);
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Advertencia',
                  detail: 'Mascota creada, pero hubo un error al subir las imágenes',
                });
                this.router.navigate(['/admin/pets']);
              },
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
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail, life: 2000 });
    setTimeout(() => this.router.navigate(['/admin/pets']), 1500);
  }

  private onError(err: any): void {
    this.saving.set(false);
    const detail = err?.error?.message ?? err?.message ?? 'Ocurrió un error inesperado';
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }
}
