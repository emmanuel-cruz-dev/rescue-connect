import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdoptionService } from '../../../adoptions/services/adoption.service';
import { RequestCard } from '../../../profile/components/request-card/request-card';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IAdoptionRequest, AdoptionStatus } from '../../../../core/models';

@Component({
  selector: 'app-my-requests',
  imports: [RouterModule, RequestCard, PRIMENG_IMPORTS],
  providers: [ConfirmationService],
  templateUrl: './my-requests.html',
})
export class MyRequests implements OnInit {
  private adoptionService = inject(AdoptionService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  requests = this.adoptionService.myRequests;
  loading = this.adoptionService.loading;
  activeFilter = signal<AdoptionStatus | 'all'>('all');

  readonly filters: { label: string; value: AdoptionStatus | 'all' }[] = [
    { label: 'Todas', value: 'all' },
    { label: 'Pendientes', value: 'pending' },
    { label: 'Aprobadas', value: 'approved' },
    { label: 'Rechazadas', value: 'rejected' },
    { label: 'Canceladas', value: 'cancelled' },
  ];

  ngOnInit(): void {
    this.adoptionService.getMyRequests().subscribe();
  }

  get filteredRequests(): IAdoptionRequest[] {
    const filter = this.activeFilter();
    const all = this.requests();
    if (filter === 'all') return all;
    return all.filter((r) => r.status === filter);
  }

  setFilter(value: AdoptionStatus | 'all'): void {
    this.activeFilter.set(value);
  }

  getCountByStatus(status: AdoptionStatus | 'all'): number {
    const all = this.requests();
    if (status === 'all') return all.length;
    return all.filter((r) => r.status === status).length;
  }

  confirmCancel(request: IAdoptionRequest): void {
    this.confirmationService.confirm({
      message: `¿Querés cancelar tu solicitud para adoptar a <strong>${request.petId.name}</strong>?`,
      header: 'Cancelar solicitud',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, cancelar',
      rejectLabel: 'No',
      acceptButtonStyleClass:
        'p-button-danger bg-red-600! border-red-600! hover:bg-red-700! text-white!',
      rejectButtonStyleClass:
        'p-button-text text-gray-500! bg-gray-100! hover:!bg-gray-200 dark:text-white! dark:bg-slate-800/20! dark:hover:bg-slate-800/30!',
      accept: () => this.cancelRequest(request._id),
    });
  }

  private cancelRequest(requestId: string): void {
    this.adoptionService.cancelRequest(requestId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Solicitud cancelada',
          detail: 'Tu solicitud fue cancelada correctamente',
        });
      },
      error: () => {
        throw new Error('Error al cancelar la solicitud');
      },
    });
  }
}
