import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivingLevelsComponent } from './diving-levels.component';

describe('DivingLevelsComponent', () => {
  let component: DivingLevelsComponent;
  let fixture: ComponentFixture<DivingLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivingLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivingLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
