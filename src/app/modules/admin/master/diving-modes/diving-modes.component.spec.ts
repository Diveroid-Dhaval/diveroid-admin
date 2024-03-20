import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivingModesComponent } from './diving-modes.component';

describe('DivingModesComponent', () => {
  let component: DivingModesComponent;
  let fixture: ComponentFixture<DivingModesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivingModesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivingModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
