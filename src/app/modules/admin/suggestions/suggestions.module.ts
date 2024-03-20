import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionTypesComponent } from './suggestion-types/suggestion-types.component';
import { SharedModule } from 'app/shared/shared.module';
import { SuggestionsComponent } from './suggestions/suggestions.component';


@NgModule({
  declarations: [
    SuggestionTypesComponent,
    SuggestionsComponent
  ],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
    SharedModule
  ]
})
export class SuggestionsModule { }
