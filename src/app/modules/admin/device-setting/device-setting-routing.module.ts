import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiveConditionComponent } from './dive-condition/dive-condition.component';
import { OxygenPercentageComponent } from './oxygen-percentage/oxygen-percentage.component';
import { Po2PercentageComponent } from './po2-percentage/po2-percentage.component';
import { WaterDepthComponent } from './water-depth/water-depth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dive-condition', 
    pathMatch: 'full',
  },
  {
    path:'dive-condition',
    component:DiveConditionComponent
  },
  {
    path:'oxygen-percentage',
    component:OxygenPercentageComponent
  },
  {
    path:'po2-percentage',
    component:Po2PercentageComponent
  },
  {
    path:'water-depth',
    component:WaterDepthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceSettingRoutingModule { }
