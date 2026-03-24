import { Component } from '@angular/core';

import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

@Component({
  selector: 'app-social-links-item',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './social-links-item.html',
})
export class SocialLinksItem {
  socialLinks = [
    { icon: 'pi pi-instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'pi pi-facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'pi pi-twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'pi pi-tiktok', url: 'https://tiktok.com', label: 'TikTok' },
  ];
}
