import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceSettingRoutingModule } from './device-setting-routing.module';
import { DiveConditionComponent } from './dive-condition/dive-condition.component';
import { SharedModule } from 'app/shared/shared.module';
import { OxygenPercentageComponent } from './oxygen-percentage/oxygen-percentage.component';
import { Po2PercentageComponent } from './po2-percentage/po2-percentage.component';
import { WaterDepthComponent } from './water-depth/water-depth.component';


@NgModule({
  declarations: [
    DiveConditionComponent,
    OxygenPercentageComponent,
    Po2PercentageComponent,
    WaterDepthComponent
  ],
  imports: [
    CommonModule,
    DeviceSettingRoutingModule,
    SharedModule
  ]
})
export class DeviceSettingModule { }
