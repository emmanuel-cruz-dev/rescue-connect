import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../../../core/services';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterModule, PRIMENG_IMPORTS],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  isLoading = signal(false);
  formSubmitted = signal(false);
  emailSent = signal(false);

  onSubmit(): void {
    this.formSubmitted.set(true);

    if (this.forgotForm.invalid) return;

    this.isLoading.set(true);
    const { email } = this.forgotForm.value;

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.emailSent.set(true);
      },
      error: (error) => {
        this.isLoading.set(false);
      },
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.forgotForm.get(controlName);
    return (control?.invalid && (control.touched || this.formSubmitted())) || false;
  }
}
