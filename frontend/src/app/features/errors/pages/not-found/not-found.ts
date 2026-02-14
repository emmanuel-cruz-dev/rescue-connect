import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { LucideAngularModule, PawPrintIcon } from 'lucide-angular';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule, LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './not-found.html',
})
export class NotFound {
  readonly PawPrintIcon = PawPrintIcon;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
