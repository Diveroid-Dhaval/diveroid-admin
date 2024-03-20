import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraRegistrationComponent } from './camera-registration.component';

describe('CameraRegistrationComponent', () => {
  let component: CameraRegistrationComponent;
  let fixture: ComponentFixture<CameraRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
