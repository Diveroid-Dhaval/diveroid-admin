import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionTypesComponent } from './suggestion-types.component';

describe('SuggestionTypesComponent', () => {
  let component: SuggestionTypesComponent;
  let fixture: ComponentFixture<SuggestionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
