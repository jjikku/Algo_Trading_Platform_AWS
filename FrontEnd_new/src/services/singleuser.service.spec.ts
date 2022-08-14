import { TestBed } from '@angular/core/testing';

import { SingleuserService } from './singleuser.service';

describe('SingleuserService', () => {
  let service: SingleuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
