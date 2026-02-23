import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, Sidebar],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {}
