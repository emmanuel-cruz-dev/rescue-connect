import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, PawPrintIcon } from 'lucide-angular';

import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-about-cta',
  imports: [RouterModule, LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './about-cta.html',
})
export class AboutCta {
  readonly PawPrintIcon = PawPrintIcon;
}
