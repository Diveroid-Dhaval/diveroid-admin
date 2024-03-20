import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionTypesComponent } from './suggestion-types/suggestion-types.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'types', 
    pathMatch: 'full',
  },
  {
    path:'types',
    component:SuggestionTypesComponent
  },
  {
    path:'list',
    component:SuggestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
