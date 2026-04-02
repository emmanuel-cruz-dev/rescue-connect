import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'petSizeLabel',
})
export class PetSizeLabelPipe implements PipeTransform {
  private readonly labels: Record<string, string> = {
    pequeño: 'Pequeño',
    mediano: 'Mediano',
    grande: 'Grande',
    'extra grande': 'Extra grande',
  };

  transform(size: string | null | undefined): string {
    if (!size) return '—';
    return this.labels[size] ?? size;
  }
}
