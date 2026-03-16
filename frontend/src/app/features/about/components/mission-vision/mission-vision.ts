import { Component } from '@angular/core';
import { LucideAngularModule, HeartHandshakeIcon, PawPrintIcon } from 'lucide-angular';

import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-mission-vision',
  imports: [LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './mission-vision.html',
})
export class MissionVision {
  readonly HeartHandshakeIcon = HeartHandshakeIcon;
  readonly PawPrintIcon = PawPrintIcon;
}
