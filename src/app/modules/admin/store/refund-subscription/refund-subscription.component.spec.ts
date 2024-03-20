import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundSubscriptionComponent } from './refund-subscription.component';

describe('RefundSubscriptionComponent', () => {
  let component: RefundSubscriptionComponent;
  let fixture: ComponentFixture<RefundSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
