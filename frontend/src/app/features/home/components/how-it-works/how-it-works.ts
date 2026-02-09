import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

interface HowItWorksStep {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [PRIMENG_IMPORTS],
  templateUrl: './how-it-works.html',
})
export class HowItWorks {
  steps: HowItWorksStep[] = [
    {
      title: 'Explorá mascotas',
      description:
        'Navegá perros y gatos disponibles. Mirá fotos, edad y descripción antes de decidir.',
      icon: 'pi pi-search',
    },
    {
      title: 'Creá tu cuenta',
      description: 'Registrate en segundos para poder enviar solicitudes y hacer seguimiento.',
      icon: 'pi pi-user-plus',
    },
    {
      title: 'Enviá tu solicitud',
      description:
        'Elegí tu mascota y contanos por qué querés adoptarla. Todo el proceso es online.',
      icon: 'pi pi-heart',
    },
    {
      title: 'Revisión',
      description: 'Nuestro equipo evalúa tu solicitud. Si es aprobada, coordinamos la adopción.',
      icon: 'pi pi-check-circle',
    },
  ];

  constructor(private router: Router) {}

  goToPets(): void {
    this.router.navigate(['/pets']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
