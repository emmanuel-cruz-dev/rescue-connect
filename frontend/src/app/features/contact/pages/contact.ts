import { Component } from '@angular/core';

import { ContactHeader } from '../components/contact-header/contact-header';
import { ContactForm } from '../components/contact-form/contact-form';
import { SocialLinksItem, PRIMENG_IMPORTS } from '../../../shared';

@Component({
  selector: 'app-contact',
  imports: [ContactHeader, ContactForm, SocialLinksItem, PRIMENG_IMPORTS],
  templateUrl: './contact.html',
})
export class Contact {}
