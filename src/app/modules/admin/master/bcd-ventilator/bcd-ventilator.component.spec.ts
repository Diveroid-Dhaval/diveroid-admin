import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcdVentilatorComponent } from './bcd-ventilator.component';

describe('BcdVentilatorComponent', () => {
  let component: BcdVentilatorComponent;
  let fixture: ComponentFixture<BcdVentilatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BcdVentilatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BcdVentilatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
