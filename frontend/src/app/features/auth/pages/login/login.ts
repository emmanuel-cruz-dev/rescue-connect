import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, PRIMENG_IMPORTS],
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  loginForm: FormGroup;
  isLoading = false;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.cd.detectChanges();

          if (response.success) {
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
          this.isLoading = false;
          this.cd.detectChanges();

          this.loginForm.patchValue({ password: '' });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor completa todos los campos correctamente',
        life: 3000,
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (control?.invalid && (control.touched || this.formSubmitted)) || false;
  }
}
