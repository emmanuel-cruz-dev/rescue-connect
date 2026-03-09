import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, PawPrintIcon } from 'lucide-angular';
import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

@Component({
  selector: 'app-adoption-dialog',
  imports: [FormsModule, LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './adoption-dialog.html',
})
export class AdoptionDialog implements OnChanges {
  @Input({ required: true }) petName!: string;
  @Input() visible = false;
  @Input() loading = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<string | undefined>();
  @Output() cancelled = new EventEmitter<void>();

  readonly PawPrintIcon = PawPrintIcon;

  message = signal<string>('');

  onConfirm(): void {
    const msg = this.message().trim();
    this.confirmed.emit(msg || undefined);
  }

  onCancel(): void {
    this.close();
    this.cancelled.emit();
  }

  onHide(): void {
    this.message.set('');
    this.visibleChange.emit(false);
  }

  close(): void {
    this.message.set('');
    this.visibleChange.emit(false);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']?.currentValue === true) {
      this.message.set('');
    }
  }
}
