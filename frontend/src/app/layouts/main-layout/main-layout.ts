import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, Navbar, Footer],
  templateUrl: './main-layout.html',
})
export class MainLayout {}
