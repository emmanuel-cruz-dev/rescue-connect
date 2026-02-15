import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { LucideAngularModule, ShieldAlertIcon } from 'lucide-angular';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-forbidden',
  imports: [RouterModule, LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './forbidden.html',
})
export class Forbidden {
  readonly ShieldAlertIcon = ShieldAlertIcon;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
