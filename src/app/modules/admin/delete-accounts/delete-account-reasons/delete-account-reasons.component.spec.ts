import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountReasonsComponent } from './delete-account-reasons.component';

describe('DeleteAccountReasonsComponent', () => {
  let component: DeleteAccountReasonsComponent;
  let fixture: ComponentFixture<DeleteAccountReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAccountReasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
