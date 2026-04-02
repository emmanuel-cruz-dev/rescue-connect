import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';

import { ScrollToTop } from './shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ScrollToTop],
  templateUrl: './app.html',
})
export class App {}
