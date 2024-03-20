import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteAccountsRoutingModule } from './delete-accounts-routing.module';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { DeleteAccountReasonsComponent } from './delete-account-reasons/delete-account-reasons.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    DeleteAccountComponent,
    DeleteAccountReasonsComponent
  ],
  imports: [
    CommonModule,
    DeleteAccountsRoutingModule,
    SharedModule
  ]
})
export class DeleteAccountsModule { }
