import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdoptionFlowService } from '../../features/adoptions/services/adoption-flow.service';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { AdoptionDialog } from '../../shared/components/adoption-dialog/adoption-dialog';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, Navbar, Footer, AdoptionDialog],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  adoptionFlow = inject(AdoptionFlowService);
}
