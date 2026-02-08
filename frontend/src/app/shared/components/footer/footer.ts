import { Component } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

@Component({
  selector: 'app-footer',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './footer.html',
})
export class Footer {
  socialLinks = [
    { icon: 'pi pi-instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'pi pi-facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'pi pi-twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'pi pi-github', url: 'https://github.com', label: 'GitHub' },
  ];

  footerLinks = {
    adoption: [
      { label: 'Ver mascotas', url: '/pets' },
      { label: 'Cómo adoptar', url: '/how-it-works' },
      { label: 'Requisitos de adopción', url: '/requirements' },
    ],
    organization: [
      { label: 'Sobre el proyecto', url: '/about' },
      { label: 'Refugios asociados', url: '/shelters' },
      { label: 'Sumarse como voluntario', url: '/volunteer' },
    ],
    help: [
      { label: 'Preguntas frecuentes', url: '/faq' },
      { label: 'Contacto', url: '/contact' },
      { label: 'Reportar un problema', url: '/support' },
    ],
  };
}
