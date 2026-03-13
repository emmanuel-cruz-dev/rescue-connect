import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';

import { AuthService } from '../../../../core/services';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { UpdateProfileData } from '../../../../core/models';

@Component({
  selector: 'app-my-profile',
  imports: [ReactiveFormsModule, PRIMENG_IMPORTS],
  providers: [MessageService, ConfirmationService],
  templateUrl: './my-profile.html',
})
export class MyProfile implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  currentUser = this.authService.currentUser;
  isEditing = signal(false);
  isLoading = signal(false);
  profileForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const user = this.currentUser();
    this.profileForm = this.fb.group({
      firstName: [user?.firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [user?.lastName || '', [Validators.required, Validators.minLength(2)]],
      phone: [user?.phone || ''],
      address: [user?.address || ''],
    });
    this.clearServerErrorsOnChange();
  }

  private clearServerErrorsOnChange(): void {
    ['firstName', 'lastName', 'phone', 'address'].forEach((field) => {
      this.profileForm.get(field)?.valueChanges.subscribe(() => {
        const control = this.profileForm.get(field);
        if (control?.hasError('serverError')) {
          const { serverError, ...remainingErrors } = control.errors || {};
          control.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
        }
      });
    });
  }

  startEditing(): void {
    this.initForm();
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    this.isEditing.set(false);
    this.profileForm.reset();
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const data: UpdateProfileData = this.profileForm.value;

    this.authService.updateProfile(data).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Perfil actualizado',
          detail: 'Tus datos fueron guardados correctamente.',
          life: 3000,
        });
        this.isEditing.set(false);
        this.isLoading.set(false);
      },
      error: (httpError) => {
        this.applyServerErrors(httpError);
        this.isLoading.set(false);
      },
    });
  }

  confirmDeleteAccount(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:
        '¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer y perderás todos tus datos.',
      header: 'Confirmar eliminación de cuenta',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectButtonStyleClass: 'p-button-text p-button-sm',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.deleteAccount();
      },
    });
  }

  private deleteAccount(): void {
    this.authService.deleteAccount().subscribe({
      next: () => {},
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.message || 'Hubo un error al eliminar la cuenta.',
          life: 3000,
        });
      },
    });
  }

  hasError(field: string, error: string): boolean {
    const control = this.profileForm.get(field);
    return !!(control?.hasError(error) && control?.touched);
  }

  private applyServerErrors(httpError: any): void {
    const errors = httpError?.error.errors;
    if (Array.isArray(errors)) {
      errors.forEach(({ field, message }: { field: string; message: string }) => {
        const control = this.profileForm.get(field);
        if (control) {
          control.setErrors({ serverError: message });
          control.markAsTouched();
        }
      });
    }
  }
}
