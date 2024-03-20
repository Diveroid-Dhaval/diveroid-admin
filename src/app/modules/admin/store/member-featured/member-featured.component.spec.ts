import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFeaturedComponent } from './member-featured.component';

describe('MemberFeaturedComponent', () => {
  let component: MemberFeaturedComponent;
  let fixture: ComponentFixture<MemberFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberFeaturedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
