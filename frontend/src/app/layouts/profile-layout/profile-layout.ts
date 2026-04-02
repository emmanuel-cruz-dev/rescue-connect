import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Navbar, Footer, Sidebar, PRIMENG_IMPORTS } from '../../shared';

@Component({
  selector: 'app-profile-layout',
  imports: [RouterModule, Navbar, Footer, Sidebar, PRIMENG_IMPORTS],
  templateUrl: './profile-layout.html',
})
export class ProfileLayout {
  sidebarDrawerVisible = false;
}
