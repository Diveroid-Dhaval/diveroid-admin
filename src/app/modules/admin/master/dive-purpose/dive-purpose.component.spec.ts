import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivePurposeComponent } from './dive-purpose.component';

describe('DivePurposeComponent', () => {
  let component: DivePurposeComponent;
  let fixture: ComponentFixture<DivePurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivePurposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivePurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
