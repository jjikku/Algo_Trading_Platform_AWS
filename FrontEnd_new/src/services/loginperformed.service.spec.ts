import { TestBed } from '@angular/core/testing';

import { LoginperformedService } from './loginperformed.service';

describe('LoginperformedService', () => {
  let service: LoginperformedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginperformedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
