import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/services';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, PRIMENG_IMPORTS],
  templateUrl: './change-password.html',
})
export class ChangePassword implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  isLoading = signal(false);
  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.clearServerErrorsOnChange();
  }

  cancelEditing(): void {
    this.changePasswordForm.reset();
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    this.authService.changePassword(this.changePasswordForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Contraseña actualizada',
          detail: 'Tu contraseña fue cambiada correctamente.',
          life: 3000,
        });
        this.changePasswordForm.reset();
        this.isLoading.set(false);
      },
      error: (httpError) => {
        this.applyServerErrors(httpError);
        this.isLoading.set(false);
      },
    });
  }

  private applyServerErrors(httpError: any): void {
    const errors = httpError?.error?.errors;
    if (Array.isArray(errors)) {
      errors.forEach(({ field, message }: { field: string; message: string }) => {
        const control = this.changePasswordForm.get(field);
        if (control) {
          control.setErrors({ serverError: message });
          control.markAsTouched();
        }
      });
    } else {
      this.changePasswordForm
        .get('currentPassword')
        ?.setErrors({ serverError: 'Contraseña actual inválida' });
    }
  }

  private clearServerErrorsOnChange(): void {
    ['currentPassword', 'newPassword'].forEach((field) => {
      this.changePasswordForm.get(field)?.valueChanges.subscribe(() => {
        const control = this.changePasswordForm.get(field);
        if (control?.hasError('serverError')) {
          const { serverError, ...remainingErrors } = control.errors || {};
          control.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
        }
      });
    });
  }

  hasError(field: string, error: string): boolean {
    const control = this.changePasswordForm.get(field);
    return !!(control?.hasError(error) && control?.touched);
  }
}
