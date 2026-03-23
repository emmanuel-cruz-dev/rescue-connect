import { Component } from '@angular/core';

import { BeforeAdopting } from '../../components/before-adopting/before-adopting';
import { AdoptionRequirements } from '../../components/adoption-requirements/adoption-requirements';

@Component({
  selector: 'app-requirements',
  imports: [BeforeAdopting, AdoptionRequirements],
  templateUrl: './requirements.html',
})
export class Requirements {}
