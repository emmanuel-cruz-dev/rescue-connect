import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../../core/services';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, PRIMENG_IMPORTS],
  templateUrl: './register.html',
})
export class Register {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  readonly isLoading = signal(false);
  private formSubmitted = signal(false);

  registerForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(254)],
    ],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    phone: [
      '',
      [
        Validators.minLength(10),
        Validators.maxLength(20),
        Validators.pattern(/^\+?(?:54\s?)?(?:9\s?)?(?:11|[2368]\d)[\s\-]?\d{4}[\s\-]?\d{4}$/),
      ],
    ],
    address: ['', [Validators.minLength(5), Validators.maxLength(100)]],
  });

  onSubmit() {
    this.formSubmitted.set(true);

    if (this.registerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor completa todos los campos requeridos',
        life: 3000,
      });
      return;
    }

    this.isLoading.set(true);

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        if (response.status === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro Exitoso',
            detail: `¡Bienvenido ${response.data?.user.firstName}! Tu cuenta ha sido creada`,
            life: 3000,
          });
          this.router.navigate(['/pets']);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.registerForm.patchValue({ password: '' });
      },
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return (control?.invalid && (control.touched || this.formSubmitted())) || false;
  }
}
