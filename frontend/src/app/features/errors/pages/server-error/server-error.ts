import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { LucideAngularModule, ServerCrashIcon } from 'lucide-angular';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-server-error',
  imports: [RouterModule, LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './server-error.html',
})
export class ServerError {
  readonly ServerCrashIcon = ServerCrashIcon;

  constructor(private location: Location) {}

  reload(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }
}
