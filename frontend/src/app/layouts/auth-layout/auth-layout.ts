import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Navbar, Footer, PRIMENG_IMPORTS } from '../../shared';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule, Navbar, Footer, PRIMENG_IMPORTS],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
