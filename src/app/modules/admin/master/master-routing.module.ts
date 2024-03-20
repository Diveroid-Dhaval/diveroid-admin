import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguagesComponent } from './languages/languages.component';
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

const routes: Routes = [
    { path: 'master', redirectTo: 'master/languages', pathMatch: 'full' },
    {
        path: 'languages',
        component: LanguagesComponent,
    },
    {
        path: 'units',
        component: UnitsComponent,
    },
    {
        path: 'diving-modes',
        component: DivingModesComponent,
    },
    {
        path: 'dive-purposes',
        component: DivePurposeComponent,
    },
    {
        path: 'water-types',
        component: WaterTypesComponent,
    },
    {
        path: 'water-entry',
        component: WaterEntryComponent,
    },
    {
        path: 'dive-visibility',
        component: DiveVisibilityComponent,
    },
    {
        path: 'diving-type',
        component: DivingTypeComponent,
    },
    {
        path: 'under-water-life',
        component: UnderWaterLifeComponent,
    },
    {
        path: 'disciplines',
        component: DisciplinesComponent,
    },
    {
        path: 'bcd-ventilator',
        component: BcdVentilatorComponent,
    },
    {
        path: 'suit-accessories',
        component: SuitAccessoriesComponent,
    },
    {
        path: 'nations',
        component: NationsComponent,
    },
    {
        path: 'status',
        component: StatusComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MasterRoutingModule {}
