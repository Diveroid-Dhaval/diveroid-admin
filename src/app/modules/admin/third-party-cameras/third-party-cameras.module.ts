import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThirdPartyCamerasRoutingModule } from './third-party-cameras-routing.module';
import { ThirdPartyCameraComponent } from './third-party-camera/third-party-camera.component';
import { CameraRegistrationComponent } from './camera-registration/camera-registration.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    ThirdPartyCameraComponent,
    CameraRegistrationComponent
  ],
  imports: [
    CommonModule,
    ThirdPartyCamerasRoutingModule,
    SharedModule
  ]
})
export class ThirdPartyCamerasModule { }
