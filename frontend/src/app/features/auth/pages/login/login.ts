import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../../core/services';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, PRIMENG_IMPORTS],
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  readonly isLoading = signal(false);
  private formSubmitted = signal(false);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.formSubmitted.set(true);

    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor completa todos los campos requeridos',
        life: 3000,
      });
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        if (response.status === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Inicio de Sesión Exitoso',
            detail: `Bienvenido ${response.data?.user.firstName}`,
            life: 3000,
          });

          const user = response.data?.user;

          if (user?.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            console.log('Redirecting to pets list');
            this.router.navigate(['/pets']);
          }
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        this.formSubmitted.set(false);

        const errorMessage = error?.error?.message || 'Credenciales inválidas';

        this.messageService.add({
          severity: 'error',
          summary: 'Error de autenticación',
          detail: errorMessage,
          life: 4000,
        });

        this.loginForm.get('password')?.setValue('', { emitEvent: false });
        this.loginForm.get('password')?.markAsUntouched();
        this.loginForm.get('password')?.markAsPristine();
      },
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (control?.invalid && (control.touched || this.formSubmitted())) || false;
  }
}
