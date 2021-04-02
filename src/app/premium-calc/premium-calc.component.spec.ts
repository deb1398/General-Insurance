import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalcComponent } from './premium-calc.component';

describe('PremiumCalcComponent', () => {
  let component: PremiumCalcComponent;
  let fixture: ComponentFixture<PremiumCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
