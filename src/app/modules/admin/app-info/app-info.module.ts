import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppInfoRoutingModule } from './app-info-routing.module';
import { AppInfoComponent } from './app-info.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    AppInfoComponent
  ],
  imports: [
    CommonModule,
    AppInfoRoutingModule,
    SharedModule
  ]
})
export class AppInfoModule { }
