import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionStoreFeaturesComponent } from './subscription-store-features.component';

describe('SubscriptionStoreFeaturesComponent', () => {
  let component: SubscriptionStoreFeaturesComponent;
  let fixture: ComponentFixture<SubscriptionStoreFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionStoreFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionStoreFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
