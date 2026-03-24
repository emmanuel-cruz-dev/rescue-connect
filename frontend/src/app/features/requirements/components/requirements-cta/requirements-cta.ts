import { Component } from '@angular/core';

import { CtaBanner } from '../../../../shared/components/cta-banner/cta-banner';

@Component({
  selector: 'app-requirements-cta',
  imports: [CtaBanner],
  template:
    '<app-cta-banner [title]="title" [description]="description" [sectionClass]="sectionClass" />',
})
export class RequirementsCta {
  title = '¿Listo para dar el siguiente paso?';
  description =
    'Ya conocés lo que implica adoptar. Ahora es momento de encontrar a ese compañero que está esperando por vos.';
  sectionClass =
    'bg-linear-to-b from-pink-50/90 to-white dark:bg-slate-900 dark:bg-linear-to-b dark:from-pink-950/30 dark:to-slate-900';
}
