import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSubscriptionReasonsComponent } from './cancel-subscription-reasons.component';

describe('CancelSubscriptionReasonsComponent', () => {
  let component: CancelSubscriptionReasonsComponent;
  let fixture: ComponentFixture<CancelSubscriptionReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelSubscriptionReasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSubscriptionReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
