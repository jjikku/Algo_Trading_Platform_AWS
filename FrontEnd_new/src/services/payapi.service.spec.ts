import { TestBed } from '@angular/core/testing';

import { PayapiService } from './payapi.service';

describe('PayapiService', () => {
  let service: PayapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
