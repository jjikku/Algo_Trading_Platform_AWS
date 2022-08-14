import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstrategyComponent } from './editstrategy.component';


describe('EditstrategyComponent', () => {
  let component: EditstrategyComponent;
  let fixture: ComponentFixture<EditstrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditstrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
