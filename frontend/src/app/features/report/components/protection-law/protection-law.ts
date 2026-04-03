import { Component } from '@angular/core';

import { PRIMENG_IMPORTS } from '../../../../shared';

interface ProtectionItem {
  icon: string;
  description: string;
}

@Component({
  selector: 'app-protection-law',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './protection-law.html',
})
export class ProtectionLaw {
  protectionItems: ProtectionItem[] = [
    {
      icon: 'pi-exclamation-circle',
      description: 'No alimentar a los animales de manera adecuada.',
    },
    {
      icon: 'pi-exclamation-circle',
      description: 'Lastimarlos intencionalmente o causarles sufrimientos innecesarios.',
    },
    {
      icon: 'pi-exclamation-circle',
      description:
        'Lastimar y arrollar animales intencionalmente, causarles torturas o sufrimientos innecesarios o matarlos por sólo espíritu de perversidad.',
    },
  ];
}
