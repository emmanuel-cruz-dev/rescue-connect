import { Component, OnInit } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

interface FaqItem {
  value: string;
  question: string;
  answer: string;
}

interface GalleryImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
}

interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
}

@Component({
  selector: 'app-faq',
  imports: [PRIMENG_IMPORTS, SectionHeader],
  templateUrl: './faq.html',
})
export class Faq implements OnInit {
  activeIndex: string = '0';

  faqs: FaqItem[] = [
    {
      value: '0',
      question: '¿Necesito registrarme para ver mascotas?',
      answer:
        'No. Puedes explorar las mascotas disponibles sin registro, pero necesitas una cuenta para enviar solicitudes de adopción.',
    },
    {
      value: '1',
      question: '¿Cuánto tarda la aprobación de una solicitud?',
      answer:
        'Usualmente dentro de 2-5 días hábiles el equipo revisa la solicitud y te notifica el resultado.',
    },
    {
      value: '2',
      question: '¿Puedo cancelar mi solicitud?',
      answer:
        'Sí. Las solicitudes pendientes pueden cancelarse desde tu perfil antes de que sean aprobadas o rechazas.',
    },
    {
      value: '3',
      question: '¿Qué pasa si mi solicitud es rechazada?',
      answer: 'Podés enviar una nueva solicitud seleccionando otra mascota que te interese.',
    },
  ];

  images: GalleryImage[] = [];

  responsiveOptions: ResponsiveOptions[] = [
    {
      breakpoint: '1280px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 4,
    },
    {
      breakpoint: '560px',
      numVisible: 4,
    },
  ];

  ngOnInit() {
    this.images = [
      {
        itemImageSrc: 'assets/images/pets/faqs1-large.webp',
        thumbnailImageSrc: 'assets/images/pets/faqs1.webp',
        alt: 'Cachorro de color canela corriendo alegremente por un césped verde bañado por la luz del sol, al fondo se ve un juguete de peluche pequeño',
      },
      {
        itemImageSrc: 'assets/images/pets/faqs2-large.webp',
        thumbnailImageSrc: 'assets/images/pets/faqs2.webp',
        alt: 'Primer plano del momento en que una persona y un gato chocan su mano y su pata, simbolizando una conexión cercana entre mascota y dueño',
      },
      {
        itemImageSrc: 'assets/images/pets/faqs3-large.webp',
        thumbnailImageSrc: 'assets/images/pets/faqs3.webp',
        alt: 'Un gato atigrado y un perro de color claro acostados juntos sobre la hierba en un momento afectuoso, el gato apoya su cabeza sobre la del perro',
      },
      {
        itemImageSrc: 'assets/images/pets/faqs4-large.webp',
        thumbnailImageSrc: 'assets/images/pets/faqs4.webp',
        alt: 'Perro de pelaje blanco y manchas color crema sentado en el césped mirando a la cámara con la lengua afuera y expresión amigable',
      },
      {
        itemImageSrc: 'assets/images/pets/faqs5-large.webp',
        thumbnailImageSrc: 'assets/images/pets/faqs5.webp',
        alt: 'Retrato de un gato blanco con manchas negras en la cabeza y orejas, apoyando sus patas delanteras sobre una superficie de madera frente a una pared verde brillante',
      },
    ];
  }
}
