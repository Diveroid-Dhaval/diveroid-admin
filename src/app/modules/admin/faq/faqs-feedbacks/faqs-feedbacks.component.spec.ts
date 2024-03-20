import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsFeedbacksComponent } from './faqs-feedbacks.component';

describe('FaqsFeedbacksComponent', () => {
  let component: FaqsFeedbacksComponent;
  let fixture: ComponentFixture<FaqsFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqsFeedbacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
