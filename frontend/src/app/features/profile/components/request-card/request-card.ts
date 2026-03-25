import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Router } from '@angular/router';

import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IAdoptionRequest } from '../../../../core/models';

type StatusSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary';

@Component({
  selector: 'app-request-card',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './request-card.html',
})
export class RequestCard {
  @Input({ required: true }) request!: IAdoptionRequest;
  @Output() onCancel = new EventEmitter<void>();

  private router = new Router();
  showDetailsDrawer = signal<boolean>(false);

  get pet() {
    return this.request.petId;
  }

  viewPet(): void {
    this.router.navigate(['/pets', this.pet._id]);
  }

  get statusLabel(): string {
    const map: Record<string, string> = {
      approved: 'Aprobada',
      rejected: 'Rechazada',
      cancelled: 'Cancelada',
      pending: 'Pendiente',
    };
    return map[this.request.status] ?? 'Pendiente';
  }

  get statusSeverity(): StatusSeverity {
    const map: Record<string, StatusSeverity> = {
      approved: 'success',
      rejected: 'danger',
      cancelled: 'secondary',
      pending: 'warn',
    };
    return map[this.request.status] ?? 'warn';
  }

  get adminNoteClass(): string {
    const map: Record<string, string> = {
      approved:
        'bg-green-50/50 border-green-100 text-green-800 dark:bg-green-900/20 dark:border-green-800/30 dark:text-green-300',
      rejected:
        'bg-red-50/50 border-red-100 text-red-800 dark:bg-red-900/20 dark:border-red-800/30 dark:text-red-300',
    };
    return (
      map[this.request.status] ??
      'bg-gray-50 border-gray-100 text-gray-600 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-300'
    );
  }

  get adminNoteClassFull(): string {
    const map: Record<string, string> = {
      approved:
        'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/30 dark:text-green-300',
      rejected:
        'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/30 dark:text-red-300',
    };
    return (
      map[this.request.status] ??
      'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-300'
    );
  }

  get adminNoteIcon(): string {
    const map: Record<string, string> = {
      approved: 'pi-check-circle text-green-600 dark:text-green-400',
      rejected: 'pi-times-circle text-red-600 dark:text-red-400',
    };
    return map[this.request.status] ?? 'pi-info-circle text-gray-500 dark:text-gray-400';
  }

  openDetailsDrawer(): void {
    this.showDetailsDrawer.set(true);
  }

  closeDetailsDrawer(): void {
    this.showDetailsDrawer.set(false);
  }
}
