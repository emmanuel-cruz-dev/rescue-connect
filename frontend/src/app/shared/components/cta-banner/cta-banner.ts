import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, PawPrintIcon } from 'lucide-angular';

import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

@Component({
  selector: 'app-cta-banner',
  imports: [RouterModule, LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './cta-banner.html',
})
export class CtaBanner {
  readonly PawPrintIcon = PawPrintIcon;
  @Input() title!: string;
  @Input() description!: string;
  @Input() sectionClass?: string;
}
