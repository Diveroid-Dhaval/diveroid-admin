import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterTypesComponent } from './water-types.component';

describe('WaterTypesComponent', () => {
  let component: WaterTypesComponent;
  let fixture: ComponentFixture<WaterTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
