import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';
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

  registerForm: FormGroup;
  isLoading = false;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      this.isLoading = true;
      const registerData = this.registerForm.value;

      this.authService.register(registerData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.cd.detectChanges();

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
        error: (error) => {
          this.isLoading = false;
          this.cd.detectChanges();

          this.registerForm.patchValue({ password: '' });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor completa todos los campos requeridos',
        life: 3000,
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return (control?.invalid && (control.touched || this.formSubmitted)) || false;
  }
}
