import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { PRIMENG_IMPORTS } from '../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, Sidebar, PRIMENG_IMPORTS],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {
  sidebarDrawerVisible = false;
}
