import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import emailjs from '@emailjs/browser';

import { environment } from '../../../../../environments/environment';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, PRIMENG_IMPORTS],
  templateUrl: './contact.html',
})
export class Contact {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  readonly isLoading = signal(false);
  private formSubmitted = signal(false);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });

  async onSubmit() {
    this.formSubmitted.set(true);

    if (this.contactForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor completa todos los campos requeridos correctamente',
        life: 3000,
      });
      return;
    }

    this.isLoading.set(true);

    try {
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name: this.contactForm.value.name,
          user_name: this.contactForm.value.name,
          user_email: this.contactForm.value.email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
        },
        environment.emailjs.publicKey
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Mensaje Enviado',
        detail:
          '¡Gracias por contactarnos! El mensaje ha sido enviado exitosamente al desarrollador.',
        life: 5000,
      });

      this.contactForm.reset();
      this.formSubmitted.set(false);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un problema al enviar el mensaje. Inténtalo más tarde.',
        life: 4000,
      });
      console.error('Error al enviar el correo:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return (control?.invalid && (control.touched || this.formSubmitted())) || false;
  }
}
