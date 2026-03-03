import { Component, inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { AdoptionService } from '../../../adoptions/services/adoption.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import {
  IAdoptionRequest,
  AdoptionRequestFilters,
  AdoptionStatus,
} from '../../../../core/models/adoption-request.model';

type StatusSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary';

@Component({
  selector: 'app-adoptions-management',
  imports: [RouterModule, FormsModule, PRIMENG_IMPORTS],
  providers: [ConfirmationService],
  templateUrl: './adoptions-management.html',
})
export class AdoptionsManagement implements OnInit, OnDestroy {
  private adoptionService = inject(AdoptionService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  @ViewChild('dt') dt!: Table;

  requests = this.adoptionService.requests;
  pagination = this.adoptionService.pagination;
  loading = this.adoptionService.loading;

  statusOptions = [
    { label: 'Estado', value: undefined },
    { label: 'Pendientes', value: 'pending' },
    { label: 'Aprobadas', value: 'approved' },
    { label: 'Rechazadas', value: 'rejected' },
    { label: 'Canceladas', value: 'cancelled' },
  ];

  filters: AdoptionRequestFilters = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    order: 'desc',
  };

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.adoptionService.requests.set([]);
    this.adoptionService.getAllRequests(this.filters).subscribe({
      error: () => {
        throw new Error('Error al cargar las solicitudes');
      },
    });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const rows = event.rows ?? 10;
    const first = event.first ?? 0;

    this.filters.page = Math.floor(first / rows) + 1;
    this.filters.limit = rows;

    if (event.sortField) {
      const field = Array.isArray(event.sortField) ? event.sortField[0] : event.sortField;
      if (field === 'createdAt' || field === 'reviewedAt' || field === 'status') {
        this.filters.sortBy = field;
      }
      this.filters.order = event.sortOrder === 1 ? 'asc' : 'desc';
    }

    this.loadRequests();
  }

  onStatusFilterChange(value: AdoptionStatus | undefined): void {
    this.filters.status = value;
    this.filters.page = 1;
    this.loadRequests();
  }

  resetFilters(): void {
    this.filters = { page: 1, limit: 10, sortBy: 'createdAt', order: 'desc' };
    this.dt.clear();
    this.loadRequests();
  }

  get hasActiveFilters(): boolean {
    return (
      this.filters.status !== undefined ||
      this.filters.sortBy !== 'createdAt' ||
      this.filters.order !== 'desc'
    );
  }

  confirmApprove(request: IAdoptionRequest): void {
    const petName = request.petId?.name ?? 'esta mascota';
    this.confirmationService.confirm({
      message: `¿Aprobás la solicitud de adopción de <strong>${petName}</strong>? Se rechazarán automáticamente las demás solicitudes pendientes para esta mascota.`,
      header: 'Aprobar solicitud',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Sí, aprobar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass:
        'p-button-success bg-green-600! border-green-600! hover:bg-green-700! text-white!',
      rejectButtonStyleClass:
        'p-button-text text-gray-500! bg-gray-100! hover:!bg-gray-200 dark:text-white! dark:bg-slate-800/20! dark:hover:bg-slate-800/30!',
      accept: () => this.approveRequest(request),
    });
  }

  confirmReject(request: IAdoptionRequest): void {
    const petName = request.petId?.name ?? 'esta mascota';
    this.confirmationService.confirm({
      message: `¿Rechazás la solicitud de adopción de <strong>${petName}</strong>?`,
      header: 'Rechazar solicitud',
      icon: 'pi pi-times-circle',
      acceptLabel: 'Sí, rechazar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass:
        'p-button-danger bg-red-600! border-red-600! hover:bg-red-700! text-white!',
      rejectButtonStyleClass:
        'p-button-text text-gray-500! bg-gray-100! hover:!bg-gray-200 dark:text-white! dark:bg-slate-800/20! dark:hover:bg-slate-800/30!',
      accept: () => this.rejectRequest(request),
    });
  }

  private approveRequest(request: IAdoptionRequest): void {
    this.adoptionService.approveRequest(request._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Aprobada',
          detail: `La solicitud fue aprobada correctamente`,
        });
        this.loadRequests();
      },
      error: () => {
        throw new Error('Error al aprobar la solicitud');
      },
    });
  }

  private rejectRequest(request: IAdoptionRequest): void {
    this.adoptionService.rejectRequest(request._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Rechazada',
          detail: `La solicitud fue rechazada`,
        });
        this.loadRequests();
      },
      error: () => {
        throw new Error('Error al rechazar la solicitud');
      },
    });
  }

  getStatusSeverity(status: AdoptionStatus): StatusSeverity {
    const map: Record<AdoptionStatus, StatusSeverity> = {
      pending: 'warn',
      approved: 'success',
      rejected: 'danger',
      cancelled: 'secondary',
    };
    return map[status];
  }

  getStatusLabel(status: AdoptionStatus): string {
    const map: Record<AdoptionStatus, string> = {
      pending: 'Pendiente',
      approved: 'Aprobada',
      rejected: 'Rechazada',
      cancelled: 'Cancelada',
    };
    return map[status];
  }

  ngOnDestroy(): void {}
}
