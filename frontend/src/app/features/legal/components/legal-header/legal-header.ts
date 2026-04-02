import { Component, input } from '@angular/core';

import { PRIMENG_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-legal-header',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './legal-header.html',
})
export class LegalHeader {
  title = input.required<string>();
  highlight = input.required<string>();
  description = input.required<string>();
  date = input<string>();
}
