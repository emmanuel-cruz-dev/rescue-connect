import { Component } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

interface Testimonial {
  name: string;
  role: string;
  message: string;
  avatar: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  imports: [SectionHeader, PRIMENG_IMPORTS],
  templateUrl: './testimonials.html',
})
export class Testimonials {
  testimonials: Testimonial[] = [
    {
      name: 'María González',
      role: 'Adoptó a Luna',
      message:
        'El proceso fue claro desde el primer momento. Pudimos seguir cada paso de la solicitud y siempre supimos en qué instancia estábamos.',
      avatar: 'assets/images/avatars/testimonial1.webp',
      rating: 5,
    },
    {
      name: 'Lucas Fernández',
      role: 'Adoptó a Milo',
      message:
        'Nos gustó mucho la transparencia y la rapidez. En pocos días nos contactaron y resolvieron todas las dudas.',
      avatar: 'assets/images/avatars/testimonial2.webp',
      rating: 4,
    },
    {
      name: 'Ana Rodríguez',
      role: 'Adoptó a Simón',
      message:
        'La plataforma es muy fácil de usar y te acompaña durante todo el proceso. Se nota que hay un equipo comprometido detrás.',
      avatar: 'assets/images/avatars/testimonial3.webp',
      rating: 5,
    },
    {
      name: 'Juan Maldonado',
      role: 'Adoptó a Rocky',
      message:
        'Me sorprendió lo ordenado que está todo. La comunicación fue clara y el seguimiento de la adopción funcionó perfecto.',
      avatar: 'assets/images/avatars/testimonial4.webp',
      rating: 4,
    },
    {
      name: 'María López',
      role: 'Adoptó a Nala',
      message:
        'Fue nuestra primera experiencia adoptando y la verdad es que nos sentimos acompañados en todo momento.',
      avatar: 'assets/images/avatars/testimonial5.webp',
      rating: 5,
    },
    {
      name: 'Ana García',
      role: 'Adoptó a Toby',
      message:
        'El proceso llevó un poco más de lo esperado, pero siempre nos mantuvieron informados. Muy recomendable.',
      avatar: 'assets/images/avatars/testimonial6.webp',
      rating: 4,
    },
  ];
}
