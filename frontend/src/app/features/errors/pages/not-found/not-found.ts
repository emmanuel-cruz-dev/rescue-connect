import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { PawPrintIcon } from 'lucide-angular';

import { ErrorSection, ErrorAction, ErrorLink } from '../../components/error-section';

@Component({
  selector: 'app-not-found',
  imports: [ErrorSection],
  template: `
    <app-error-section
      code="404"
      title="Página no encontrada"
      description="Lo sentimos, no pudimos encontrar la página que buscas."
      subDescription="Parece que esta mascota se escapó de nuestro refugio"
      icon="pi pi-times-circle"
      [lucideIcon]="PawPrintIcon"
      [actions]="actions"
      footerHeading="Enlaces útiles"
      [footerLinks]="footerLinks"
    />
  `,
})
export class NotFound {
  readonly PawPrintIcon = PawPrintIcon;
  private location = inject(Location);

  actions: ErrorAction[] = [
    {
      label: 'Volver atrás',
      icon: 'pi pi-arrow-left',
      outlined: true,
      styleClass:
        'text-sky-700! border-sky-600! hover:bg-sky-50 dark:text-sky-400! dark:border-sky-600! dark:hover:bg-sky-900/20',
      onClick: () => this.location.back(),
    },
    {
      label: 'Ir al inicio',
      icon: 'pi pi-home',
      routerLink: '/',
      styleClass: 'bg-pink-600! border-pink-600! hover:bg-pink-700! dark:text-white!',
    },
  ];

  footerLinks: ErrorLink[] = [
    { label: 'Inicio', routerLink: '/' },
    { label: 'Mascotas', routerLink: '/pets' },
    { label: 'Iniciar sesión', routerLink: '/auth/login' },
  ];
}
