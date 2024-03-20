import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePricingComponent } from './feature-pricing.component';

describe('FeaturePricingComponent', () => {
  let component: FeaturePricingComponent;
  let fixture: ComponentFixture<FeaturePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturePricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
