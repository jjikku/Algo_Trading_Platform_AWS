import { TestBed } from '@angular/core/testing';

import { SinglestrategyService } from './singlestrategy.service';

describe('SinglestrategyService', () => {
  let service: SinglestrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglestrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
