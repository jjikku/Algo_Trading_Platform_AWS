import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptstrategyComponent } from './subscriptstrategy.component';

describe('SubscriptstrategyComponent', () => {
  let component: SubscriptstrategyComponent;
  let fixture: ComponentFixture<SubscriptstrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptstrategyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptstrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
