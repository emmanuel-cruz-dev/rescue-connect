import { Component } from '@angular/core';

import { CtaBanner } from '../../../../shared';

@Component({
  selector: 'app-about-cta',
  imports: [CtaBanner],
  template: '<app-cta-banner [title]="title" [description]="description" />',
})
export class AboutCta {
  title = '¿Querés cambiar la vida de una mascota?';
  description =
    'Cientos de amigos de cuatro patas están esperando una oportunidad. Tu hogar podría ser el lugar que siempre soñaron.';
}
