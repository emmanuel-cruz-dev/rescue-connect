import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';

const PRIMENG_MODULES = [
  ButtonModule,
  CardModule,
  TableModule,
  ToastModule,
  DialogModule,
  InputTextModule,
  PasswordModule,
  FileUploadModule,
  GalleriaModule,
  ChipModule,
  TagModule,
  PaginatorModule,
  ConfirmDialogModule,
  ToolbarModule,
  MenuModule,
  ProgressSpinnerModule,
  MenubarModule,
  BadgeModule,
  AvatarModule,
  RippleModule,
  DividerModule,
  CarouselModule,
];

@NgModule({
  imports: [PRIMENG_MODULES],
  exports: [PRIMENG_MODULES],
})
export class PrimeNgModule {}
