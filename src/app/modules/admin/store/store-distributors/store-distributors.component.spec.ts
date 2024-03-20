import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDistributorsComponent } from './store-distributors.component';

describe('StoreDistributorsComponent', () => {
  let component: StoreDistributorsComponent;
  let fixture: ComponentFixture<StoreDistributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDistributorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
