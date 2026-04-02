import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'petTypeLabel',
})
export class PetTypeLabelPipe implements PipeTransform {
  private readonly labels: Record<string, string> = {
    perro: 'Perro',
    gato: 'Gato',
  };

  transform(type: string | null | undefined): string {
    if (!type) return '—';
    return this.labels[type] ?? type;
  }
}
