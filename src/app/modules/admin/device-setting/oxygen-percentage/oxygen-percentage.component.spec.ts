import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxygenPercentageComponent } from './oxygen-percentage.component';

describe('OxygenPercentageComponent', () => {
  let component: OxygenPercentageComponent;
  let fixture: ComponentFixture<OxygenPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OxygenPercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OxygenPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
