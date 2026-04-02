import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sidebar, PRIMENG_IMPORTS } from '../../shared';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, Sidebar, PRIMENG_IMPORTS],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {
  sidebarDrawerVisible = false;
}
