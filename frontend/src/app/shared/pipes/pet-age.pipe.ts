import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'petAge',
})
export class PetAgePipe implements PipeTransform {
  transform(birthDate: Date | string | null | undefined): string {
    if (!birthDate) return 'Sin datos';

    const birth = new Date(birthDate);
    const today = new Date();
    const totalMonths = Math.floor(
      (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
    );

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) return months === 1 ? '1 mes' : `${months} meses`;
    if (months === 0) return years === 1 ? '1 año' : `${years} años`;

    const yearLabel = years === 1 ? 'año' : 'años';
    const monthLabel = months === 1 ? 'mes' : 'meses';
    return `${years} ${yearLabel} y ${months} ${monthLabel}`;
  }
}
