import { Component } from '@angular/core';

import { BeforeAdopting } from '../../components/before-adopting/before-adopting';
import { AdoptionRequirements } from '../../components/adoption-requirements/adoption-requirements';
import { RequirementsCta } from '../../components/requirements-cta/requirements-cta';

@Component({
  selector: 'app-requirements',
  imports: [BeforeAdopting, AdoptionRequirements, RequirementsCta],
  templateUrl: './requirements.html',
})
export class Requirements {}
