import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqCategoriesComponent } from './faq-categories/faq-categories.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqsFeedbacksComponent } from './faqs-feedbacks/faqs-feedbacks.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'faq-categories', 
        pathMatch: 'full',
    },
    {
        path: 'faq-categories',
        component: FaqCategoriesComponent,
    },
    {
        path: 'faqs',
        component: FaqsComponent,
    },
    {
        path: 'faqs-feedbacks',
        component: FaqsFeedbacksComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FaqRoutingModule {}
