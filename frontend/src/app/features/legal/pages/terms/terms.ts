import { Component } from '@angular/core';

import { LegalHeader } from '../../components/legal-header/legal-header';
import { LegalSection } from '../../components/legal-section/legal-section';
import { PRIMENG_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-terms',
  imports: [LegalHeader, LegalSection, PRIMENG_IMPORTS],
  templateUrl: './terms.html',
})
export class Terms {}
