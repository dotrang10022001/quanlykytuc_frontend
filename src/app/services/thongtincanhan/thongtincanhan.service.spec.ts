import { TestBed } from '@angular/core/testing';

import { ThongtincanhanService } from './thongtincanhan.service';

describe('ThongtincanhanService', () => {
  let service: ThongtincanhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongtincanhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
