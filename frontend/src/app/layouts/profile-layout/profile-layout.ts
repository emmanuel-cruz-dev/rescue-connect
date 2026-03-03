import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { PRIMENG_IMPORTS } from '../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-profile-layout',
  imports: [RouterModule, Navbar, Footer, Sidebar, PRIMENG_IMPORTS],
  templateUrl: './profile-layout.html',
})
export class ProfileLayout {
  sidebarDrawerVisible = false;
}
