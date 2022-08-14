import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratpnlComponent } from './stratpnl.component';

describe('StratpnlComponent', () => {
  let component: StratpnlComponent;
  let fixture: ComponentFixture<StratpnlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratpnlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratpnlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
