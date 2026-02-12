import { Component, Input } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-section-header',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './section-header.html',
})
export class SectionHeader {
  @Input() eyebrow: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
