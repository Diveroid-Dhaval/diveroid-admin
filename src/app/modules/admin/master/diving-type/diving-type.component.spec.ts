import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivingTypeComponent } from './diving-type.component';

describe('DivingTypeComponent', () => {
  let component: DivingTypeComponent;
  let fixture: ComponentFixture<DivingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
