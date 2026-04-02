import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adoptionStatusLabel',
})
export class AdoptionStatusLabelPipe implements PipeTransform {
  private readonly labels: Record<string, string> = {
    pending: 'Pendiente',
    approved: 'Aprobada',
    rejected: 'Rechazada',
    cancelled: 'Cancelada',
  };

  transform(status: string | null | undefined): string {
    if (!status) return '—';
    return this.labels[status] ?? status;
  }
}
