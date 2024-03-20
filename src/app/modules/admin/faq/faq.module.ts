import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqCategoriesComponent } from './faq-categories/faq-categories.component';
import { SharedModule } from 'app/shared/shared.module';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqsFeedbacksComponent } from './faqs-feedbacks/faqs-feedbacks.component';

@NgModule({
  declarations: [
    FaqCategoriesComponent,
    FaqsComponent,
    FaqsFeedbacksComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule,
    SharedModule,
  ],
 
})
export class FaqModule { }
