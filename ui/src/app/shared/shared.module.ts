import { NgModule } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@NgModule({
  providers: [DialogService, MessageService]
})
export class SharedModule {}
