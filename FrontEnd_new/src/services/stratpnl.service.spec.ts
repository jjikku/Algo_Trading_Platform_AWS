import { TestBed } from '@angular/core/testing';

import { StratpnlService } from './stratpnl.service';

describe('StratpnlService', () => {
  let service: StratpnlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StratpnlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
