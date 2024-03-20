import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveConditionComponent } from './dive-condition.component';

describe('DiveConditionComponent', () => {
  let component: DiveConditionComponent;
  let fixture: ComponentFixture<DiveConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiveConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
