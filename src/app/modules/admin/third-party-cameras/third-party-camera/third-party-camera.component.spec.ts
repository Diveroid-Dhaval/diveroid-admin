import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyCameraComponent } from './third-party-camera.component';

describe('ThirdPartyCameraComponent', () => {
  let component: ThirdPartyCameraComponent;
  let fixture: ComponentFixture<ThirdPartyCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdPartyCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
