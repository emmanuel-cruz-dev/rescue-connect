import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { ScrollToTop } from '../../shared/components/scroll-to-top/scroll-to-top';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, Navbar, Footer, ScrollToTop],
  templateUrl: './main-layout.html',
})
export class MainLayout {}
