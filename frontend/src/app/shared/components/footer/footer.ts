import { Component } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

@Component({
  selector: 'app-footer',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './footer.html',
})
export class Footer {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'pi pi-twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'pi pi-facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'pi pi-instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'pi pi-github', url: 'https://github.com', label: 'GitHub' },
  ];

  footerLinks = {
    product: [
      { label: 'Características', url: '/features' },
      { label: 'Precios', url: '/pricing' },
      { label: 'Demos', url: '/demos' },
    ],
    company: [
      { label: 'Acerca de', url: '/about' },
      { label: 'Blog', url: '/blog' },
      { label: 'Carreras', url: '/careers' },
    ],
    support: [
      { label: 'Centro de Ayuda', url: '/help' },
      { label: 'Contacto', url: '/contact' },
      { label: 'FAQ', url: '/faq' },
    ],
    legal: [
      { label: 'Privacidad', url: '/privacy' },
      { label: 'Términos', url: '/terms' },
      { label: 'Cookies', url: '/cookies' },
    ],
  };
}
