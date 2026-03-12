import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../../core/services';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('newPassword');
  const confirm = control.get('confirmPassword');
  if (password && confirm && password.value !== confirm.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterModule, PRIMENG_IMPORTS],
  templateUrl: './reset-password.html',
})
export class ResetPassword implements OnInit {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  token = '';
  isLoading = signal(false);
  formSubmitted = signal(false);
  passwordReset = signal(false);
  resetForm: FormGroup = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  get passwordMismatch(): boolean {
    return (
      this.resetForm.hasError('passwordMismatch') &&
      (this.resetForm.get('confirmPassword')?.touched || this.formSubmitted())
    );
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';

    if (!this.token) {
      this.router.navigate(['/auth/login']);
    }
  }

  onSubmit(): void {
    this.formSubmitted.set(true);
    if (this.resetForm.invalid) return;

    this.isLoading.set(true);
    const { newPassword } = this.resetForm.value;

    this.authService.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.passwordReset.set(true);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.message || 'Token inválido o expirado',
          life: 5000,
        });
      },
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.resetForm.get(controlName);
    return (control?.invalid && (control.touched || this.formSubmitted())) || false;
  }
}
