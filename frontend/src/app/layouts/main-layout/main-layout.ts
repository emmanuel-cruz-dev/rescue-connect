import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdoptionFlowService } from '../../features/adoptions/services/adoption-flow.service';
import { Navbar, Footer, AdoptionDialog } from '../../shared';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, Navbar, Footer, AdoptionDialog],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  adoptionFlow = inject(AdoptionFlowService);
}
