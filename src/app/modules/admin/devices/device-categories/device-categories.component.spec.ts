import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoriesComponent } from './device-categories.component';

describe('DeviceCategoriesComponent', () => {
  let component: DeviceCategoriesComponent;
  let fixture: ComponentFixture<DeviceCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
