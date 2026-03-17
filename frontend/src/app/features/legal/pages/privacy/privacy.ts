import { Component } from '@angular/core';

import { LegalHeader } from '../../components/legal-header/legal-header';
import { LegalSection } from '../../components/legal-section/legal-section';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-privacy',
  imports: [LegalHeader, LegalSection, PRIMENG_IMPORTS],
  templateUrl: './privacy.html',
})
export class Privacy {}
