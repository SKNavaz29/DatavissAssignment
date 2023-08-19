import { TestBed } from '@angular/core/testing';

import { ValueProviderService } from './value-provider.service';

describe('ValueProviderService', () => {
  let service: ValueProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
