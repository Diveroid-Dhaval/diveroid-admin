import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistedTokensComponent } from './blacklisted-tokens.component';

describe('BlacklistedTokensComponent', () => {
  let component: BlacklistedTokensComponent;
  let fixture: ComponentFixture<BlacklistedTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlacklistedTokensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistedTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
