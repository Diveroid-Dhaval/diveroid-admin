import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInfoRoutingModule } from './my-info-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { OrganizationComponent } from './organization/organization.component';
import { DivingLevelsComponent } from './diving-levels/diving-levels.component';
import { AvatarsComponent } from './avatars/avatars.component';
import { ActivityMedalsComponent } from './activity-medals/activity-medals.component';


@NgModule({
  declarations: [
    OrganizationComponent,
    DivingLevelsComponent,
    AvatarsComponent,
    ActivityMedalsComponent
  ],
  imports: [
    CommonModule,
    MyInfoRoutingModule,
    SharedModule
  ]
})
export class MyInfoModule { }
