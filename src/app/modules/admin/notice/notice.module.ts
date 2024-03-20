import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeComponent } from './notice.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    NoticeComponent
  ],
  imports: [
    CommonModule,
    NoticeRoutingModule,
    SharedModule
  ]
})
export class NoticeModule { }
