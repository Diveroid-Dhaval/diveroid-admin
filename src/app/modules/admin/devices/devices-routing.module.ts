import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceCategoriesComponent } from './device-categories/device-categories.component';
import { DeviceMasterComponent } from './device-master/device-master.component';
import { MemberDevicesComponent } from './member-devices/member-devices.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'device-categories',
        pathMatch: 'full',
    },
    {
        path: 'device-categories',
        component: DeviceCategoriesComponent,
    },
    {
        path: 'devices',
        component: DeviceMasterComponent,
    },
    {
        path: 'member-devices',
        component: MemberDevicesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevicesRoutingModule {}
