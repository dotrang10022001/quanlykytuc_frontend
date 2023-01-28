import { TestBed } from '@angular/core/testing';

import { PhananhService } from './phananh.service';

describe('PhananhService', () => {
  let service: PhananhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhananhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
