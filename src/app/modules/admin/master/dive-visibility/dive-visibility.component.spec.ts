import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveVisibilityComponent } from './dive-visibility.component';

describe('DiveVisibilityComponent', () => {
  let component: DiveVisibilityComponent;
  let fixture: ComponentFixture<DiveVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveVisibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiveVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
