import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, PRIMENG_IMPORTS],
  templateUrl: './login.html',
})
export class Login {
  messageService = inject(MessageService);
  loginForm: FormGroup;
  isLoading = false;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
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
      console.log('Login data:', loginData);

      // TODO: replace with backend call
      setTimeout(() => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Inicio de Sesión Exitoso',
          detail: 'Bienvenido de nuevo',
          life: 3000,
        });

        // Optional: Reset the form
        // this.loginForm.reset();
        // this.formSubmitted = false;
      }, 2000);
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
