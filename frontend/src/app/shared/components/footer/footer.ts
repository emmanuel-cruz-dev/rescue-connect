import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SocialLinksItem } from '../social-links-item/social-links-item';
import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

@Component({
  selector: 'app-footer',
  imports: [RouterModule, SocialLinksItem, PRIMENG_IMPORTS],
  templateUrl: './footer.html',
})
export class Footer {
  footerLinks = {
    adoption: [
      { label: 'Cómo adoptar', url: '/how-it-works' },
      { label: 'Sobre el proyecto', url: '/about' },
      { label: 'Requisitos de adopción', url: '/requirements' },
    ],
    organization: [
      { label: 'Salvá vidas', url: '/save-lives' },
      { label: 'Denuncia el maltrato', url: '/report' },
      { label: 'Refugios recomendados', url: '/shelters' },
    ],
    help: [
      { label: 'Contacto', url: '/contact' },
      { label: 'Términos de uso', url: '/legal/terms' },
      { label: 'Política de privacidad', url: '/legal/privacy' },
    ],
  };
}
