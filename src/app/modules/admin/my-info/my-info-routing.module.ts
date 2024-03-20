import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { DivingLevelsComponent } from './diving-levels/diving-levels.component';
import { AvatarsComponent } from './avatars/avatars.component';
import { ActivityMedalsComponent } from './activity-medals/activity-medals.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'organizations', 
    pathMatch: 'full',
  },
  {
    path:'organizations',
    component:OrganizationComponent
  },
  {
    path:'diving-levels',
    component:DivingLevelsComponent
  },
  {
    path:'avatars',
    component:AvatarsComponent
  },
  {
    path:'activity-medals',
    component:ActivityMedalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyInfoRoutingModule { }
