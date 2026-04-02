import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue',
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: string | null | undefined, fallback: string = '—'): string {
    return value?.trim() ? value : fallback;
  }
}
