import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitAccessoriesComponent } from './suit-accessories.component';

describe('SuitAccessoriesComponent', () => {
  let component: SuitAccessoriesComponent;
  let fixture: ComponentFixture<SuitAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuitAccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
