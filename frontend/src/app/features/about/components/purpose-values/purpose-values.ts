import { Component } from '@angular/core';
import { LucideAngularModule, ShieldCheckIcon, ClockIcon, UsersIcon } from 'lucide-angular';

import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-purpose-values',
  imports: [LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './purpose-values.html',
})
export class PurposeValues {
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly ClockIcon = ClockIcon;
  readonly UsersIcon = UsersIcon;
}
