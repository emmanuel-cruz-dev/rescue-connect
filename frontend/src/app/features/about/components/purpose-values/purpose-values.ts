import { Component } from '@angular/core';
import { ShieldCheckIcon, ClockIcon, UsersIcon } from 'lucide-angular';

import {
  InfoCardsSection,
  InfoCard,
  InfoCardsSectionConfig,
} from '../../../../shared/components/info-cards-section/info-cards-section';

@Component({
  selector: 'app-purpose-values',
  imports: [InfoCardsSection],
  template: '<app-info-cards-section [config]="config" [cards]="cards" />',
})
export class PurposeValues {
  config: InfoCardsSectionConfig = {
    title: 'Nuestro <span class="text-pink-600">propósito</span>',
    subtitle:
      'Más allá de la tecnología, nos mueven principios sólidos para garantizar que cada adopción sea un éxito para toda la vida.',
  };

  cards: InfoCard[] = [
    {
      icon: ShieldCheckIcon,
      iconBgClass: 'bg-pink-100 dark:bg-pink-900/30',
      iconColorClass: 'text-pink-600',
      title: 'Adopción segura',
      description:
        'Validamos cada perfil y solicitud para asegurar que las mascotas lleguen a hogares preparados para recibirlas.',
    },
    {
      icon: ClockIcon,
      iconBgClass: 'bg-sky-100 dark:bg-sky-900/30',
      iconColorClass: 'text-sky-600',
      title: 'Acompañamiento',
      description:
        'La adopción no termina en la entrega. Ofrecemos recursos y orientación para facilitar la adaptación de cada mascota a su nuevo hogar.',
    },
    {
      icon: UsersIcon,
      iconBgClass: 'bg-purple-100 dark:bg-purple-900/30',
      iconColorClass: 'text-purple-600',
      title: 'Comunidad activa',
      description:
        'Fomentamos una red de adoptantes y voluntarios que comparten experiencias y consejos de tenencia responsable.',
    },
  ];
}
