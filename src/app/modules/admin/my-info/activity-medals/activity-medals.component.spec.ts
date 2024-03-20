import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMedalsComponent } from './activity-medals.component';

describe('ActivityMedalsComponent', () => {
  let component: ActivityMedalsComponent;
  let fixture: ComponentFixture<ActivityMedalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityMedalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityMedalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
