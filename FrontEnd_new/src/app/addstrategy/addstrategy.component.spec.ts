import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstrategyComponent } from './addstrategy.component';

describe('AddstrategyComponent', () => {
  let component: AddstrategyComponent;
  let fixture: ComponentFixture<AddstrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddstrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
