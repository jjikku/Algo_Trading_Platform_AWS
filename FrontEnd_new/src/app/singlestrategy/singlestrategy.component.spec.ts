import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglestrategyComponent } from './singlestrategy.component';

describe('SinglestrategyComponent', () => {
  let component: SinglestrategyComponent;
  let fixture: ComponentFixture<SinglestrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglestrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglestrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
