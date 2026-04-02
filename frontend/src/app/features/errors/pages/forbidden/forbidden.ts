import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ShieldAlertIcon } from 'lucide-angular';

import { ErrorSection, ErrorAction, ErrorLink } from '../../components/error-section';

@Component({
  selector: 'app-forbidden',
  imports: [ErrorSection],
  template: `
    <app-error-section
      code="403"
      title="Acceso Denegado"
      description="Lo sentimos, no tienes permisos para acceder a esta página."
      subDescription="Esta área está protegida"
      icon="pi pi-lock"
      [lucideIcon]="ShieldAlertIcon"
      [actions]="actions"
      footerHeading="¿Necesitas ayuda?"
      [footerLinks]="footerLinks"
    />
  `,
})
export class Forbidden {
  readonly ShieldAlertIcon = ShieldAlertIcon;
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
    { label: 'Iniciar sesión', routerLink: '/auth/login' },
    { label: 'Registrarse', routerLink: '/auth/register' },
  ];
}
