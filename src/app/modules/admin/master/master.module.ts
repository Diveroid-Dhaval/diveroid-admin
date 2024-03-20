import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { LanguagesComponent } from './languages/languages.component';
import { SharedModule } from 'app/shared/shared.module';
import { UnitsComponent } from './units/units.component';
import { DivingModesComponent } from './diving-modes/diving-modes.component';
import { DivePurposeComponent } from './dive-purpose/dive-purpose.component';
import { WaterTypesComponent } from './water-types/water-types.component';
import { WaterEntryComponent } from './water-entry/water-entry.component';
import { DiveVisibilityComponent } from './dive-visibility/dive-visibility.component';
import { DivingTypeComponent } from './diving-type/diving-type.component';
import { UnderWaterLifeComponent } from './under-water-life/under-water-life.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { BcdVentilatorComponent } from './bcd-ventilator/bcd-ventilator.component';
import { SuitAccessoriesComponent } from './suit-accessories/suit-accessories.component';
import { NationsComponent } from './nations/nations.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [
    LanguagesComponent,
    UnitsComponent,
    DivingModesComponent,
    DivePurposeComponent,
    WaterTypesComponent,
    WaterEntryComponent,
    DiveVisibilityComponent,
    DivingTypeComponent,
    UnderWaterLifeComponent,
    DisciplinesComponent,
    BcdVentilatorComponent,
    SuitAccessoriesComponent,
    NationsComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
  ]
})
export class MasterModule { }
