import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterDepthComponent } from './water-depth.component';

describe('WaterDepthComponent', () => {
  let component: WaterDepthComponent;
  let fixture: ComponentFixture<WaterDepthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterDepthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterDepthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
