import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDevicesComponent } from './member-devices.component';

describe('MemberDevicesComponent', () => {
  let component: MemberDevicesComponent;
  let fixture: ComponentFixture<MemberDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
