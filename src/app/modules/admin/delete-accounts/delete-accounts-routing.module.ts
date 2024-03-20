import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteAccountReasonsComponent } from './delete-account-reasons/delete-account-reasons.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'reasons', 
    pathMatch: 'full',
  },
  {
    path:'reasons',
    component:DeleteAccountReasonsComponent
  },
  {
    path:'account',
    component:DeleteAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteAccountsRoutingModule { }
