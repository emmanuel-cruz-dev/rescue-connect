import { Component } from '@angular/core';

import { PRIMENG_IMPORTS } from '../../../../shared';

interface Step {
  header: string;
  collapsed: boolean;
  items: StepItem[];
}

interface StepItem {
  label?: string;
  text?: string;
  link?: StepItemLink;
}

interface StepItemLink {
  href: string;
  label: string;
}

@Component({
  selector: 'app-steps-to-report',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './steps-to-report.html',
})
export class StepsToReport {
  public steps: Step[] = [
    {
      header: '¿Dónde denunciar?',
      collapsed: false,
      items: [
        {
          label: 'En Provincia:',
          text: 'Comisaría local o, mejor aún, en la Unidad Fiscal de Instrucción (UFI) del domicilio donde presuntivamente ocurrió el hecho.',
        },
        {
          label: 'En Capital Federal:',
          link: { href: 'https://mpfciudad.gob.ar/denuncias', label: 'mpfciudad.gob.ar/denuncias' },
        },
      ],
    },
    {
      header: 'Prepará los datos clave',
      collapsed: true,
      items: [
        { text: 'Fecha y hora del incidente.' },
        { text: 'Lugar donde ocurrió el hecho.' },
        {
          text: 'Datos del culpable como nombre o dirección (si se conocen).',
        },
        {
          text: 'Fotos o videos que prueben el maltrato (con fecha visible).',
        },
        { text: 'Testimonios de testigos, si los hay.' },
      ],
    },
    {
      header: 'Hacé la denuncia por escrito',
      collapsed: true,
      items: [
        {
          text: 'La denuncia debe ser firmada y sellada por el funcionario que la reciba.',
        },
        { text: 'Pedí el número de expediente para darle seguimiento.' },
      ],
    },
    {
      header: 'En casos graves',
      collapsed: true,
      items: [
        {
          text: 'En caso de muerte del animal, colocá el cuerpo en la heladera hasta que un veterinario verifique la muerte y expida un certificado para practicar una necropsia. Debe realizarla un organismo oficial para que tenga validez legal (ej: Facultad de Veterinaria en Capital Federal, 4524-8400). Luego agregá los resultados al expediente y seguí la causa.',
        },
      ],
    },
    {
      header: 'Consejos extra',
      collapsed: true,
      items: [
        { text: 'Llevá una copia de la Ley 14.346.' },
        {
          text: 'Las denuncias son personales: debe efectuarlas quien presenció el hecho.',
        },
        {
          text: 'Necesitás acreditar tu identidad con DNI, Libreta de Enrolamiento o Cívica. Si sos extranjero sin DNI, con tu Cédula de Identidad.',
        },
      ],
    },
  ];

  toggleStep(currentStep: Step): void {
    if (!currentStep.collapsed) {
      this.steps.forEach((step) => {
        if (step !== currentStep) {
          step.collapsed = true;
        }
      });
    }
  }
}
