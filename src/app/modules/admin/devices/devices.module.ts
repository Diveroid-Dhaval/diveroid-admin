import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { DeviceCategoriesComponent } from './device-categories/device-categories.component';
import { DeviceMasterComponent } from './device-master/device-master.component';
import { MemberDevicesComponent } from './member-devices/member-devices.component';


@NgModule({
  declarations: [
    DeviceCategoriesComponent,
    DeviceMasterComponent,
    MemberDevicesComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    SharedModule
  ]
})
export class DevicesModule { }
