import { Component } from '@angular/core';

import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { ContactHeader } from '../../components/contact-header/contact-header';
import { ContactForm } from '../../components/contact-form/contact-form';

@Component({
  selector: 'app-contact',
  imports: [ContactHeader, ContactForm, PRIMENG_IMPORTS],
  templateUrl: './contact.html',
})
export class Contact {}
