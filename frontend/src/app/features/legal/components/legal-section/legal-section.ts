import { Component, input } from '@angular/core';

import { PRIMENG_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-legal-section',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './legal-section.html',
})
export class LegalSection {
  icon = input.required<string>();
  iconBg = input.required<string>();
  iconColor = input.required<string>();
  title = input.required<string>();
}
