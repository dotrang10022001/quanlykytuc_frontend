import { TestBed } from '@angular/core/testing';

import { LoaiphongService } from './loaiphong.service';

describe('LoaiphongService', () => {
  let service: LoaiphongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiphongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
