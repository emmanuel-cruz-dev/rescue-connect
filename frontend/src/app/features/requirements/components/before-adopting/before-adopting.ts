import { Component } from '@angular/core';

import { AgeInfoCard } from '../age-info-card/age-info-card';
import { PRIMENG_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-before-adopting',
  imports: [AgeInfoCard, PRIMENG_IMPORTS],
  templateUrl: './before-adopting.html',
})
export class BeforeAdopting {
  readonly stages = [
    {
      key: 'cachorro',
      label: 'Cachorro',
      ageRange: 'Menos de 1 año',
      description:
        'Es adorable y gratificante ver su crecimiento, pero requiere tiempo y dedicación. Necesita alimentación frecuente, educación constante y mucha paciencia. Puede romper objetos o llorar si se queda solo, y su tamaño y carácter aún están en desarrollo.',
      image: '/assets/images/requirements/cachorro.avif',
      color: 'cachorro',
    },
    {
      key: 'joven',
      label: 'Joven',
      ageRange: '1-5 años',
      description:
        'Es juguetón pero más equilibrado. Aprende con facilidad y se adapta rápidamente. Come dos veces al día, ya tiene su tamaño definitivo y una personalidad más definida, lo que facilita la convivencia.',
      image: '/assets/images/requirements/joven.avif',
      color: 'joven',
    },
    {
      key: 'adulto',
      label: 'Adulto',
      ageRange: '5-9 años',
      description:
        'Es tranquilo y compañero. Puede quedarse solo por periodos razonables sin generar problemas y se adapta bien a nuevos hogares. Su carácter ya está definido, lo que permite una convivencia estable y predecible.',
      image: '/assets/images/requirements/adulto.avif',
      color: 'adulto',
    },
    {
      key: 'abuelo',
      label: 'Abuelo',
      ageRange: '+ de 10 años',
      description:
        'Son tranquilos, cariñosos y disfrutan de la calma. Aunque su tiempo de compañía puede ser más breve, ofrecen afecto genuino y gratitud. Adoptarlos es darles una vida digna y recibir a cambio una compañía muy especial.',
      image: '/assets/images/requirements/abuelo.avif',
      color: 'abuelo',
    },
  ];
}
