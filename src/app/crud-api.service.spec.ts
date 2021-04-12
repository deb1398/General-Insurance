import { TestBed } from '@angular/core/testing';

import { CRUDApiService } from './crud-api.service';

describe('CRUDApiService', () => {
  let service: CRUDApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRUDApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
