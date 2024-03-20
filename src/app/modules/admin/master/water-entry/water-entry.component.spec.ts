import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterEntryComponent } from './water-entry.component';

describe('WaterEntryComponent', () => {
  let component: WaterEntryComponent;
  let fixture: ComponentFixture<WaterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
