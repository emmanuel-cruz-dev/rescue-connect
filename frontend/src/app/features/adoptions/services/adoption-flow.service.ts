import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services';
import { AdoptionService } from './adoption.service';
import { IPet } from '../../../core/models';

@Injectable({
  providedIn: 'root',
})
export class AdoptionFlowService {
  private adoptionService = inject(AdoptionService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);

  dialogVisible = signal<boolean>(false);
  loading = signal<boolean>(false);

  private activePet = signal<{ id: string; name: string } | null>(null);

  petName = computed(() => this.activePet()?.name ?? '');

  canAdopt(pet: IPet): boolean {
    const user = this.authService.getCurrentUser();
    return !!user && user.role === 'user' && !pet.adopted;
  }

  openDialog(pet: IPet): void {
    this.activePet.set({ id: pet._id, name: pet.name });
    this.dialogVisible.set(true);
  }

  submit(message?: string): void {
    const pet = this.activePet();
    if (!pet) return;

    this.loading.set(true);
    this.adoptionService.createRequest(pet.id, message ? { message } : {}).subscribe({
      next: () => {
        this.loading.set(false);
        this.dialogVisible.set(false);
        this.messageService.add({
          severity: 'success',
          summary: '¡Solicitud enviada!',
          detail: `Tu solicitud para adoptar a ${pet.name} fue enviada correctamente.`,
          life: 5000,
        });
      },
      error: () => {
        this.loading.set(false);
        throw new Error('Error al enviar la solicitud');
      },
    });
  }

  cancel(): void {
    this.dialogVisible.set(false);
  }
}
