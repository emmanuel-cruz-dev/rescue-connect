import { Component } from '@angular/core';

import { PRIMENG_IMPORTS } from '../../../../shared';

interface ReportStep {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-to-report',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './how-to-report.html',
})
export class HowToReport {
  reportSteps: ReportStep[] = [
    {
      icon: 'pi-megaphone',
      title: 'Delito de acción pública',
      description:
        'Cualquiera puede denunciar mientras sea mayor de 18 años y acredite su identidad.',
    },
    {
      icon: 'pi-hammer',
      title: 'Protección legal',
      description: 'No se necesitan mayores formalidades para hacerlo.',
    },
    {
      icon: 'pi-clock',
      title: 'Proceso simple',
      description: 'Podés realizar una denuncia en pocos pasos y sin trámites complejos.',
    },
    {
      icon: 'pi-bolt',
      title: 'Impacto real',
      description: 'Tu denuncia puede salvar una vida.',
    },
  ];
}
