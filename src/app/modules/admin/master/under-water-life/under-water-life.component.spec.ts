import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderWaterLifeComponent } from './under-water-life.component';

describe('UnderWaterLifeComponent', () => {
  let component: UnderWaterLifeComponent;
  let fixture: ComponentFixture<UnderWaterLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderWaterLifeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderWaterLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
