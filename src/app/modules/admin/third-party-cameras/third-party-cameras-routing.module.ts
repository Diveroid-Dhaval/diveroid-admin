import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThirdPartyCameraComponent } from './third-party-camera/third-party-camera.component';
import { CameraRegistrationComponent } from './camera-registration/camera-registration.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cameras',
        pathMatch: 'full',
    },
    {
        path: 'cameras',
        component: ThirdPartyCameraComponent,
    },
    {
        path: 'registration',
        component: CameraRegistrationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThirdPartyCamerasRoutingModule {}
