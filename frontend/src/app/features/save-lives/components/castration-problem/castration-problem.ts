import { Component } from '@angular/core';
import { HeartPulse, Scale, Syringe } from 'lucide-angular';

import { InfoCardsSection, InfoCard, InfoCardsSectionConfig } from '../../../../shared';

@Component({
  selector: 'app-castration-problem',
  imports: [InfoCardsSection],
  template: '<app-info-cards-section [config]="config" [cards]="cards" />',
})
export class CastrationProblem {
  config: InfoCardsSectionConfig = {
    title: 'Una solución <span class="text-pink-600">real y urgente</span>',
    subtitle:
      'La castración no es solo una decisión individual, es una herramienta clave para prevenir el sufrimiento animal a gran escala.',
    sectionClass:
      'py-16 bg-linear-to-b from-white to-pink-50/90 dark:bg-slate-900 dark:bg-linear-to-b dark:from-slate-900 dark:to-pink-950/30',
  };

  cards: InfoCard[] = [
    {
      icon: HeartPulse,
      iconBgClass: 'bg-pink-100 dark:bg-pink-900/30',
      iconColorClass: 'text-pink-600 text-3xl',
      title: 'El problema',
      description:
        'Miles de perros y gatos nacen cada año sin posibilidades reales de tener un hogar. Muchos terminan en la calle, expuestos al hambre, enfermedades y abandono.',
    },
    {
      icon: Scale,
      iconBgClass: 'bg-purple-100 dark:bg-purple-900/30',
      iconColorClass: 'text-purple-600',
      title: 'La realidad',
      description:
        'Aunque debería garantizarse desde el Estado, muchas campañas de castración no alcanzan. Por eso, ONGs y voluntarios organizan operativos en zonas vulnerables.',
    },
    {
      icon: Syringe,
      iconBgClass: 'bg-sky-100 dark:bg-sky-900/30',
      iconColorClass: 'text-sky-600',
      title: 'La solución',
      description:
        'Cada castración evita camadas no deseadas y reduce el sufrimiento futuro. Estas acciones son posibles gracias a personas que deciden involucrarse y colaborar.',
    },
  ];
}
