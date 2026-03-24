import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { PRIMENG_IMPORTS } from '../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule, Navbar, Footer, PRIMENG_IMPORTS],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
