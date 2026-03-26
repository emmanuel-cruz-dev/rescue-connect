import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import emailjs from '@emailjs/browser';

import { environment } from '../../../../../environments/environment';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

const RATE_LIMIT_KEY = 'contact-form-submissions';
const MAX_SUBMISSIONS_PER_DAY = 3;

interface RateLimitData {
  count: number;
  date: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, PRIMENG_IMPORTS],
  templateUrl: './contact-form.html',
})
export class ContactForm {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  readonly isLoading = signal(false);
  private formSubmitted = signal(false);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(254)],
    ],
    subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
  });

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getRateLimitData(): RateLimitData {
    try {
      const raw = localStorage.getItem(RATE_LIMIT_KEY);
      if (!raw) return { count: 0, date: this.getTodayString() };

      const data: RateLimitData = JSON.parse(raw);

      if (data.date !== this.getTodayString()) {
        return { count: 0, date: this.getTodayString() };
      }
      return data;
    } catch {
      return { count: 0, date: this.getTodayString() };
    }
  }

  private incrementRateLimitCount(): void {
    const data = this.getRateLimitData();
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ count: data.count + 1, date: data.date })
    );
  }

  get remainingSubmissions(): number {
    return Math.max(0, MAX_SUBMISSIONS_PER_DAY - this.getRateLimitData().count);
  }

  get isRateLimited(): boolean {
    return this.getRateLimitData().count >= MAX_SUBMISSIONS_PER_DAY;
  }

  async onSubmit() {
    this.formSubmitted.set(true);

    if (this.isRateLimited) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Límite alcanzado',
        detail: `Alcanzaste el límite de ${MAX_SUBMISSIONS_PER_DAY} mensajes por día. Volvé mañana.`,
        life: 5000,
      });
      return;
    }

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

      this.incrementRateLimitCount();

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
