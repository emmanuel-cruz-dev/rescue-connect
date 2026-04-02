import { Component } from '@angular/core';
import { ServerCrashIcon } from 'lucide-angular';

import { ErrorSection, ErrorAction, ErrorLink } from '../../components/error-section';

@Component({
  selector: 'app-server-error',
  imports: [ErrorSection],
  template: `
    <app-error-section
      code="500"
      title="Error del Servidor"
      description="Oops! Algo salió mal en nuestro lado."
      subDescription="Por favor intenta de nuevo más tarde"
      icon="pi pi-exclamation-triangle"
      [lucideIcon]="ServerCrashIcon"
      [actions]="actions"
      footerHeading="Si el problema persiste, contáctanos:"
      [footerLinks]="footerLinks"
    />
  `,
})
export class ServerError {
  readonly ServerCrashIcon = ServerCrashIcon;

  actions: ErrorAction[] = [
    {
      label: 'Reintentar',
      icon: 'pi pi-refresh',
      outlined: true,
      styleClass:
        'text-sky-700! border-sky-600! hover:bg-sky-50 dark:text-sky-400! dark:border-sky-600! dark:hover:bg-sky-900/20',
      onClick: () => window.location.reload(),
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
    { label: 'Soporte', href: 'emmanuelgerr@gmail.com' },
    { label: 'Recargar página', onClick: () => window.location.reload() },
  ];
}
