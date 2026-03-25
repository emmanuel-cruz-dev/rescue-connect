import { Component } from '@angular/core';

import { ShelterCard } from '../shelter-card/shelter-card';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-shelter-list',
  imports: [ShelterCard, PRIMENG_IMPORTS],
  templateUrl: './shelter-list.html',
})
export class ShelterList {
  shelters = [
    {
      id: 1,
      name: 'El Campito Refugio',
      image: 'campito-refugio.webp',
      logo: 'campito-refugio.avif',
      location: 'Monte Grande, Argentina',
      website: 'https://elcampitorefugio.org/',
      description:
        'Asociación Civil sin Fines de Lucro, declarada de Interés Sanitario por la Legislatura y el Senado. Única en América Latina, con la misión de rescatar animales en situación de calle, recuperarlos y darles la oportunidad de encontrar una familia. Desde 2009, hemos trabajado incansablemente para demostrar que cada vida merece una segunda oportunidad.',
    },
    {
      id: 2,
      name: 'Proyecto 4 Patas',
      image: 'proyecto-4-patas.webp',
      logo: 'proyecto-4-patas.avif',
      location: 'Buenos Aires, Argentina',
      website: 'https://proyecto4patas.org/',
      description:
        'Este proyecto nace de la convicción de que para efectuar una transformación real, es esencial comprometerse de forma directa. Somos un equipo de personas impulsadas por la empatía hacia los animales, reconociéndolos como nuestros semejantes debido a su capacidad para experimentar placer, alegría, dolor y sufrimiento. Nuestra misión consiste en inspirar un cambio de mentalidad que repercuta positivamente en la crítica situación que enfrentamos, vinculada a la sobrepoblación, el abandono, la crueldad y la indiferencia que afectan a millones de perros y gatos en nuestro país.',
    },
    {
      id: 3,
      name: 'Refugio Don Torcuato',
      image: 'don-torcuato.webp',
      logo: 'don-torcuato.avif',
      location: 'Buenos Aires, Argentina',
      website: 'https://refugiodontorcuato.org/',
      description:
        'Refugio de animales dedicado a ayudar a animales en necesidad. Actualmente alberga a más de 400 animales entre perros y gatos, víctimas del maltrato. Organización sin fines de lucro.',
    },
  ];
}
