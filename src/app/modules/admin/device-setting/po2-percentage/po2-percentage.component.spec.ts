import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Po2PercentageComponent } from './po2-percentage.component';

describe('Po2PercentageComponent', () => {
  let component: Po2PercentageComponent;
  let fixture: ComponentFixture<Po2PercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Po2PercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Po2PercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
